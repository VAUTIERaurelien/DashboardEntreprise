var data = {
  "theme": "auto",
  "index": 1,
  "pages": [
    {
      "id": 1,
      "name": "Demo Page",
      "content": "<div class=\"accordion\" id=\"PageDemo\"></div>\n<script>\n  for (const className of contents) {\n    eval(className).demo('PageDemo');\n  }\n</script>\n\n<div class=\"card mt-3\">\n  <div class=\"card-header\">\n    Add Addon\n  </div>\n  <div class=\"card-body\">\n    <pre class=\"md\">\nIn the site settings you have a code editor, here you can put whatever you want, it will be available no matter what page you are on. \nBut if you want to follow the same concept proposed here, copy the code below and modify it as you wish.\n\n```html\n<script>\n  class AddonPerso extends Content {\n    constructor() {\n      super();\n      for (const element of $('addonperso')) {\n        if (!$(element).parents('code').length) {\n          $(element).replaceWith(`\n            <div class=\"${element.className}\" id=\"${element.id}\">\n                ${element.innerHTML}\n            </div>`);\n        };\n      }\n    }\n\n    static demo(parentId = 'Demo__container') {\n      $(`#${parentId}`).append(`\n      <div class=\"accordion-item\">\n        <h2 class=\"accordion-header\">\n          <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#${parentId}AddonPerso\"\n            aria-expanded=\"false\" aria-controls=\"${parentId}AddonPerso\">\n            AddonPerso\n          </button>\n        </h2>\n        <div id=\"${parentId}AddonPerso\" class=\"accordion-collapse collapse\" data-bs-parent=\"#${parentId}\">\n          <div class=\"accordion-body\">\n            <div class=\"row\">\n              <div class=\"col\">\n                <addonperso>My Addon</addonperso>\n              </div>\n              <div class=\"col\">\n                <pre class=\"md\">\n\\`\\`\\`html\n<addonperso>My Addon</addonperso>\n\\`\\`\\`\n                </pre>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>`);\n    }\n  }\n\n  contents.push('AddonPerso')\n</script>\n```\n    </pre>\n  </div>\n</div>"
    }
  ],
  "addon": ""
};
const itemClasses = [];