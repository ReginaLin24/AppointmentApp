<h1 align="center">Welcome to 🩺 Virtual Appointment App 🏥</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Today many health clincis still rely on paper forms to gather patient details and arrange doctor appointments. This process is not only time-consuming but also prone to errors. This Virtual Appointment Application will help you transform this tedioius process into a seamless experience, enabling clinicians collect neccessary information and connect patients with preferred doctors with ease.

### ✨ [Demo deployed on Azure App Services](https://rl-patientapp.azurewebsites.net/) ✨

## How to set this up locally

1. Before running this website locally, first we need to set up the feature flag properly on the LaunchDarkly platform.
2. One of the features I have set up is to add in a few field in the appointment request form to gather data around respiratory symptoms to provide the best care and protect other patients.
3. We need to create a feature flag named **'newDataField'** on the platform, and copy the SDK key
4. In _index.js_, look for _const client = LaunchDarkly.init(LAUNCHDARKLY_SDK_KEY);_, replace LAUNCHDARKLY_SDK_KEY with the SDK key you copied in Step 4.
5. WooHoo, you are ready to move on and run the application locally.

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Author

👤 **Regina Lin**
