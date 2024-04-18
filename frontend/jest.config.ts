export default {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env.local
                    VITE_API_PATH: 'http://localhost:5000',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    // mocking assests and styling
    '\\.(gif|ttf|eot|svg|png|webp)$': '<rootDir>/config/jest/file-mock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/config/jest/style-mock.ts',

    // making jest understand absolute paths
    '@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['./config/jest/setup-tests.ts'],
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  modulePaths: ['<rootDir>/src'],
};
