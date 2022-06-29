<div style="display: flex; flex-direction: column; align-items: center;">

<div style="display: flex; align-items: center;">
    <h1>Calendar</h1>
    <p style="margin-left: 16px;">
        <img src="https://github.com/digitalfeatures/calendar/blob/main/assets/logo/logo.png?raw=true" style="width:64px; height: 64px; border-radius: 4px;" />
    </p>
</div>

#### record your life.

</div>

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)

## How to build or run the electron

Fisrt, you need to run the npm script command, like:

```bash
npm install
```

After this command is run, it will automatically trigger the command exection of `npm run preinstall`.

The command that  `npm run preinstall` used the makefile command that `make init` to build the html content.

Then, after it is installed, we only use the command that `npm run start` to see the application, like:

```bash
npm run start
```

## How to package the application

package the application, you only use the command:

```bash
npm run package
```
