04 Feb 2024
Reason: Crash in Stage Details
Folder: helper.utility.ts
Issue 01: In calculate cash function
when number is null then shows error
For Fix add:
if (isEmpty(amount)) {
return '$' + 0 + flag;
}

Issue 02: In twoColorCompare function
when color is null then shows error
For fix add: change similar function
const isSimilar = (rgb1: any[], rgb2: any[]) => {
const componentNames = ['r', 'g', 'b'];
for (let i = 0; i < componentNames.length; ++i) {
if (rgb1?.[i] !== rgb2?.[i]) {
return false;
}
}
return true;
};

issue: 03 In TaskItem Component
when task done then can't navigate details screen
add disable onPress for fix this issues
fix:
disabled={taskStatus === 2}

issue 04 : 

    changed the colors.style.asset, customDrawer.core.component,     EachDrawerItem , Footer files.
    Reason: Centralize the drawer colors for different agency. below is the changed object and file name: 

    in colors i added this object persisting all the colors for drawer: 
        drawer: {
            bg: appColors.primary,
            text: baseColors.white,
            select: baseColors.gray0,
            selectedText: baseColors.white,
            icon: baseColors.white,
            selectedIcon: baseColors.white,
            divider: baseColors.gray0,
            ...appColors.drawer,
        },
    and in config i added a drawer object in appColors object for overwriting the colors when needed for drawer changes with requirement of the agencies. Ex:-
        appColors: {
            primary: '#252d47',
            secondary: '#F4F4F4',
            badgeColor: '#E8191C',
            splashBg: '#252d47',
            drawer: {
                bg: '#252d47',      --> changed 
                select: '#DDDDDE',  --> changed
                divider: '#ffffff', --> changed
            },
        },
    now if we want to change the color of our drawer then just add the color in config with the correct property name with colors drawer property name..it will overwrite the colors and give us the ultimate result.