module.exports = {
  'apps/web/src/**/*.{js,ts,jsx,tsx}': (files) => [
    `yarn workspace web lint --max-warnings=0 --file ${files
      .map((file) => `"${file.split('apps/web/').pop()}"`)
      .join(' --file ')}`,
  ],
  'apps/api/src/**/*.{js,ts,jsx,tsx}': (files) => [
    `yarn workspace api lint --max-warnings=0 ${files
      .map((file) => `"${file.split('apps/api/').pop()}"`)
      .join(' ')}`,
  ],
}
