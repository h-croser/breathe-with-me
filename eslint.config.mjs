import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['**.mjs', '**.cjs', 'dist/**', '.netlify/**', '.next/**', 'src/app/not-found.tsx', '**/next-env.d.ts']
  },
  tseslint.configs.recommendedTypeChecked,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    rules: {
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Props: true,
            props: true,
            doc: true,
            docs: true,
            Docs: true,
            Params: true,
            params: true,
            Env: true,
            env: true
          }
        }
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true
          }
        }
      ],
      'unicorn/no-null': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  },
  {
    rules: {
      'unicorn/filename-case': 'off'
    },
    files: ['src/server/database/migrations/*.ts', 'src/server/database/seeds/*.ts', 'src/routes/**/*.tsx']
  },
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...eslintPluginReactHooks.configs.recommended.rules
    }
  },
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/no-default-export': 'error'
    },
    files: ['src/**/*.{ts,tsx,js,jsx}']
  },
  {
    rules: {
      'import/no-default-export': 'off'
    },
    files: ['src/app/**/{page,layout,not-found}.tsx']
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
);
