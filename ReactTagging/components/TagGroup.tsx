import * as React from 'react';
import {
    Button,
    Tooltip,
    Tag,
    FluentProvider,
    makeStyles,
    Theme,
    webDarkTheme,
    webLightTheme,
    teamsDarkTheme,
    teamsLightTheme,
    TagAppearance,
    TagShape,
} from '@fluentui/react-components';
import {
    AddCircle32Regular,
} from "@fluentui/react-icons";

const useState = React.useState;

/**
 * Represents a tag with label, optional text color, and optional background color.
 */
export interface IMyTag {
    id: number
    label: string;
    textColor?: string;
    backgroundColor?: string;
}

export interface IMyTagGroupProps {
    tags: IMyTag[];
    readOnly: boolean;
    initialTags?: string;
    initialTagsString?: string;
    theme: Theme;
    tagShape: string;
    tagAppearance: string;
    tagString?: string;
    onChange?: (tags: IMyTag[], tagString: string) => void;
}


export const MyTagGroup = React.memo((props: IMyTagGroupProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const { initialTagsString, onChange, readOnly = false, theme, tagAppearance, tagShape } = props;
    const [tags, setTags] = useState<IMyTag[]>([]);
    const [showInput, setShowInput] = useState<boolean>(false);
    const styles = _useStyles();

    const inputRef = React.useRef<HTMLInputElement>(null); // Used to capture the input element for setting focus later

    React.useEffect(() => {
        //simulate a data load to give time for the existing tags to be loaded before rendering the component
        setTimeout(() => {
            console.log(initialTagsString);
            if (initialTagsString) {
                // Split the string into an array and map to an array of IMyTag objects
                const initialTags = initialTagsString.split(',').map((tag, index) => ({
                    id: index,
                    label: tag.trim(),
                }));

                setTags(initialTags); // Update the state with the initial tags

                const tagLabels = initialTags.map(tag => tag.label).join(', ');
                onChange?.(initialTags, tagLabels);
            }
            setLoading(false);
        }, 1000);
    }, [initialTagsString]);

    React.useEffect(() => {
        if (showInput) {
            inputRef.current?.focus();
        }
    }, [showInput]);

    const addTag = (tag: IMyTag) => {
        if (tag && !tags.find(t => t.label === tag.label)) {
            const newTags = [...tags, tag];
            setTags(newTags);
            const tagLabels = newTags.map(tag => tag.label).join(', ');
            onChange?.(newTags, tagLabels);
        }
    };

    const removeTag = (tag: IMyTag) => {
        const newTags = tags.filter(t => t.label !== tag.label);
        setTags(newTags);
        const tagLabels = newTags.map(tag => tag.label).join(', ');
        onChange?.(newTags, tagLabels);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const maxId = tags.length > 0 ? Math.max(...tags.map(tag => tag.id)) : 0;
            const newTag: IMyTag = { id: maxId + 1, label: event.currentTarget.value };
            addTag(newTag);
            event.currentTarget.value = '';
            showInput && setShowInput(false);
        }
    };

    if (loading) {
        return <div>Loading Tags...</div>;
    }

    return (
        <div className={styles.root}>
            <div className={styles.tagContainer}>
                <FluentProvider theme={props.theme}>
                    {/* Dynamic tags from the tags array */}
                    {tags.map((tag, index) => (
                        <Tag key={index}
                            appearance={props.tagAppearance as TagAppearance}
                            shape={props.tagShape as TagShape}
                            dismissible
                            dismissIcon={{ "aria-label": "remove" }}
                            onClick={() => removeTag(tag)}>
                            {tag.label}
                        </Tag>
                    ))}
                    {showInput ? (
                        <input className={styles.inputField} ref={inputRef} type="text" onKeyDown={handleKeyDown} placeholder="Add a tag" onBlur={() => setShowInput(false)} />
                    ) : (
                        <Tooltip content="Add a tag" relationship="label">
                            <Button
                                className={styles.addTagButton}
                                icon={<AddCircle32Regular />}
                                shape="circular"
                                appearance="primary"
                                onClick={() => { setShowInput(true); }}>Add Tag</Button>
                        </Tooltip>
                    )}
                </FluentProvider>
            </div>

        </div>
    );
});
MyTagGroup.displayName = "Tags";

const _useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%", // Ensure the root takes the full width of the parent
    },
    tagContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        width: "100%", // Full width
        minHeight: "32px", // Minimum height to start with
        flexGrow: 1, // Used to make the container grow based on content
    },
    inputField: {
        flexGrow: 1, // Used to make the input field grow based on content
        flexShrink: 1, // Used to make the input field shrink based on content
    },
    addTagButton: {
        flexGrow: 0,
        flexShrink: 0,
        marginLeft: "auto",
    }
});


