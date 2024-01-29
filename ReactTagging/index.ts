import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { MyTagGroup, IMyTagGroupProps, IMyTag } from "./components/TagGroup";
import { darkThemeCompanyBlue, lightThemeCompanyBlue } from "./customthemes/CompanyBlue";
import * as React from "react";
import { Theme, teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components";


export class ReactTagging implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    private stringTags: string | undefined;
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged: () => void;
    private state: ComponentFramework.Dictionary;
    private themeSelected: Theme;
    private tagShape: string;
    private tagAppearance: string;
    private initialTagsString: string | undefined;
    private existingTags: string[] = [];
    private entityName: string;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        _context: ComponentFramework.Context<IInputs>,
        _notifyOutputChanged: () => void,
        _state: ComponentFramework.Dictionary,
        // _theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>      
    ): void {
        this.notifyOutputChanged = _notifyOutputChanged;
        this.context = _context;
        this.context.mode.trackContainerResize(true);
        this.state = _state;

        var _themeSelected = this.context.parameters.Theme.raw;
        var _tagShape = this.context.parameters.TagShape.raw;
        var _tagAppearance = this.context.parameters.TagAppearance.raw;
        var _initialTagsString = this.context.parameters.Tags.raw;

        switch (_themeSelected) {
            case "Web Light Theme":
                this.themeSelected = webLightTheme
                break
            case "Web Dark Theme":
                this.themeSelected = webDarkTheme
                break
            case "Teams Light Theme":
                this.themeSelected = teamsLightTheme
                break
            case "Teams Dark Theme":
                this.themeSelected = teamsDarkTheme
                break
            case "Use Platform Theme":
                this.themeSelected = this.context.fluentDesignLanguage?.tokenTheme
                break
            case "Company Blue Light Theme":
                this.themeSelected = lightThemeCompanyBlue
                break
            case "Company Blue Dark Theme":
                this.themeSelected = darkThemeCompanyBlue
                break
            default:
                this.themeSelected = lightThemeCompanyBlue
                break
        }

        switch (_tagShape) {
            case "Circular":
                this.tagShape = "circular"
                break
            case "Rounded":
                this.tagShape = "rounded"
                break
            default:
                this.tagShape = "circular"
                break
        }

        switch (_tagAppearance) {
            case "Brand":
                this.tagAppearance = "brand"
                break
            case "Filled":
                this.tagAppearance = "filled"
                break
            case "Outline":
                this.tagAppearance = "outline"
                break
            default:
                this.tagAppearance = "brand"
                break
        }
        this.initialTagsString = _initialTagsString ?? undefined;


    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */

        public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
            
            let tags: IMyTag[] = [];
            
            // Retrieve the value of themeSelected from above
            let themeSelected: Theme = this.themeSelected as unknown as Theme;

            return React.createElement(MyTagGroup, {
                context: context,
                tags: tags,
                readOnly: false,
                theme: themeSelected,
                tagAppearance: this.tagAppearance,
                tagShape: this.tagShape,
                initialTagsString: this.initialTagsString,
                onChange: this.onChange,
            } as IMyTagGroupProps);
        }

        private onChange = (currentArray: IMyTag[]): void => {
            this.stringTags = currentArray.map((tag) => tag.label).join(",");
            this.notifyOutputChanged();
        };

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { Tags: this.stringTags } as IOutputs;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
