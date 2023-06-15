module.exports = {
  content: [
    "./projects/spear/src/**/*.{html,ts}",
    './projects/spear/src/assets/objects/media/*__classes.json',
    './projects/spear/src/assets/objects/panelpage/*.json'
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ]
}