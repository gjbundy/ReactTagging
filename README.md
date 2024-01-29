# React Native Tagging Control


This control will allow you to take a text field from your table in a Model-Driven Power App and turn it into a Tags field. This PCF is 100% React Native and built from the ground up that way. 

## Current Release:

**Unmanaged Solution**

[ReactNativeTagging_v_1_0_2.zip](https://github.com/gjbundy/ReactTagging/releases/download/initial-release/ReactNativeTagging_v_1_0_2.zip)

**Managed Solution**

[ReactNativeTagging_v_1_0_2_managed](https://github.com/gjbundy/ReactTagging/releases/download/initial-release/ReactNativeTagging_v_1_0_2_managed.zip)
## Installation Instructions
**Step 1 - Install the solution into your Power Apps Dataverse Environment**

**Step 2 - Add the component to your solution *(optional but recommended)***

**Step 3 - Add the component to a Single Line Text Column in your form**

**Step 4 - Configure the Input Configuration Options below**

### Video of Installation
<iframe width="560" height="315" src="<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Input Configurations

### All Available Options
![Alt text](<docs/images/ReactTagging - Options.jpg>)

### 1. Theme
You can select one of the themes that are listed, or if you choose, you can just use the Platform Theme and whatever theme you have there will be used natively.

![Theme options for ReactTagging](<docs/images/ReactTagging - Theme.jpg>)

### 2. TagShape
These are your options for what shape you want your tags to be. For reference you can view the options [here](https://react.fluentui.dev/?path=/docs/components-tag-tag--default#shape)
![TagShape options for ReactTagging](<docs/images/ReactTagging - TagShape.jpg>)

### 3. TagAppearance
These are your options for the tag's appearance. For reference you can view what each of the different options are [here](https://react.fluentui.dev/?path=/docs/components-tag-tag--default#appearance)

![TagAppearance options for ReactTagging](<docs/images/ReactTagging - TagAppearance.jpg>)

## Output
The tool will output tags visibly, but behind the scenes your single line text field will contain a comma separated value of your tags.