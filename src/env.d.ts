/* eslint-disable spaced-comment */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/client" />

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}