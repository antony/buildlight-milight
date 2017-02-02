## Buildlight

Very simplistic module to create a colour-changing build light for CircleCIg

### Purpose

* Turns the build light red, if any builds have failed.
* Turns the build light green, if all builds are passing.
* Turns the build light yellow, if any builds are in progress.

### Equipment

You will need:

 * A milight, limitlessled, or equivalent bulb
 * Bridge for above bulb

### Running

Simple to run.

```
yarn install
npm start
```

* You can use `npm` instead of `yarn` if you enjoy waiting for things.

### Config

Configuration is done using a simple JSON file using the following format

```
{
  "apiKey": "your-circle-api-key",
  "vcs": {
    "user": "your-circleci-username",
    "projects": ["list", "of", "builds", "to", "monitor"]
  },
  "light": {
    "bridge": "your-bridge-ip-address",
    "zone": milight-zone-number
  }
}
```

Currently, buildlight monitors only the master branch, and the last 1 build of each project.