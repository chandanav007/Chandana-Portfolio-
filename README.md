# Chandana V — Professional Portfolio

Static portfolio website (HTML, CSS, JavaScript) for **Chandana V**, Transaction Officer at Mphasis — banking operations, chargebacks & e-disputes, and data analytics.

Live (after GitHub Pages is enabled): https://chandanav007.github.io/Chandana-Portfolio-/

## Structure

```
index.html            Main page
css/style.css         Styles
js/main.js            Interactions (menu, filters, modal, contact form)
assets/profile.jpg    Profile photograph
assets/Chandana_V_Resume.pdf        Resume (PDF, used by download buttons)
assets/Chandana_V_ATS_Resume.docx   Resume (original Word file)
assets/favicon.svg    Site icon
robots.txt, sitemap.xml, .nojekyll
```

## Deploy on GitHub Pages

1. Create the repository `Chandana-Portfolio-` under `chandanav007`.
2. Upload **all files in this folder** to the repository root (so `index.html` sits at the top level).
3. Go to **Settings → Pages → Build and deployment → Deploy from a branch**, choose **main** and **/(root)**, then **Save**.
4. After a minute the site is live at `https://chandanav007.github.io/Chandana-Portfolio-/`.

## Contact form

Messages are sent through FormSubmit to `chandanav007@gmail.com`. The **first** message triggers a one-time activation email from FormSubmit — open it and click **Activate**. After that, every message arrives in the inbox. If sending ever fails, the form opens the visitor's email app with the message pre-filled.

## Adding GitHub project links

In `js/main.js`, set the `github` field for each project in `PROJECTS` to the repository URL. Until then, the buttons open the GitHub profile.

## Updating the resume or photo

Replace `assets/Chandana_V_Resume.pdf` or `assets/profile.jpg` with a new file using the same name.
