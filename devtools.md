# Devtools

You can start the devtools as simple as running

`npx overmind-devtools`

from the command line. You can add this to your custom **npm** script by:

{% code-tabs %}
{% code-tabs-item title="package.json" %}
```javascript
{
  "scripts": {
    "devtools": "npx overmind-devtools"
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

If you prefer installing the devtools, giving you control over which version of the devtools to run, you can

`npm install overmind-devtools`

and the **npm** script can be changed to:

{% code-tabs %}
{% code-tabs-item title="package.json" %}
```javascript
{
  "scripts": {
    "devtools": "overmind-devtools"
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

