// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json.

const signingKeys = {
  "keys": [ 
    {
      "alg":"RS256",
      "e":"AQAB",
      "kid":"zObBQ6QfR5HnKAJd9HhoObmJqojropaz54zqf2+1zqk=",
      "kty":"RSA",
      "n":"o_K4yCMajjivLFuH48oM9u2m5OXg-hAJ7wRv97lpm0o_ZZAM2rY6oFwwL7lVGVCKcH048mifadzadH1Jooa6VGPq6I4zFOey0cbMAwMCyNR-rzHN0jMlHyBEExFSgtAWF1Q0u7j28F3F8LX2zEhyaPFC7ir42e1q2zyQ6Oh8kutRQm4pkrWjajrpmOI-KnkYjpmyFOFdgDYNgdFIduGhT0kZNVPPxyoOsZ6nuIJOZP4o7yTa9vJSRIdtD9k17tzFMympQoW9ZVccVMomey1iQKinHmRkcPwVFjiU8H1gSWkfdv3WsnJPNzGo2e3gAEF8d-JlRQ_XhZpAOi1_NSaGfQ",
      "use":"sig"
    },
    {
      "alg":"RS256",
      "e":"AQAB",
      "kid":"ZxSNiLaZMDgs5ev5t0foAVvoY3qvghD8MltmUceD/0I=",
      "kty":"RSA",
      "n":"lzC78mzfHoxtE5KVfAvkbVUw-X6tUrBAIcVujFpdGF8He0FlWxctGnisByT1s00mdAZ44YUFSDbx4gArHRRAYlYgMlI3njFKuoRGcHIkL1w4fQcisij3OM8nWdZJXdNSueb1SzhoR5xsDhPZnRGMMs3f0QohA_gCQ0Z51cSUN0EadUBW66dCT3lVdeSwnc8jwwbTas-mKY5958u9kT9fdj69F_9HwTfaFKyYu3nnO04E2InoPD_K4xZ4_oDfCVyKyjB2HLVtwhxfx6ly4Wh_p-McXOg75WcfPgSQg6IopJ5m9AteTiLDld9kHrey0KvH4K3Sztc90SvZOiV4AWHrKQ",
      "use":"sig"
    }
  ]
};

export const environment = {
  production: true,
  site: 'spearhead',
  apiGatewaySettings: {
    endpointUrl: 'https://edge.hedge.earth/emissionless/rollthecloudinc/spearhead-objects-prod/shapeshifter',
  },
  mediaSettings: {
    endpointUrl: 'https://edge.hedge.earth/emissionless/media',
    cloudinaryUrl: 'https://api.cloudinary.com/v1_1/dj4vvkgzw',
    uploadPreset: 'i0hm4opm',
    imageUrl: 'https://edge.hedge.earth/emissionless/spearhead',
    bucket: 'classifieds-ui-prod',
    prefix: 'media/'
  },
  adSettings: {
    adUrl: 'https://d2o66qxp1qwfb9.cloudfront.net/ads'
  },
  taxonomySettings: {
    vocabularyUrl: 'https://d2o66qxp1qwfb9.cloudfront.net/vocabularies'
  },
  profileSettings: {
    profileUrl: 'https://d2o66qxp1qwfb9.cloudfront.net/profiles'
  },
  loggingSettings: {
    endpointUrl: "https://classifieds-dev.azurewebsites.net/logging"
  },
  chatSettings: {
    endpointUrl: "https://classifieds-dev.azurewebsites.net/chat"
  },
  oktaSettings: {
    redirectUri: 'https://classifieds-ui.com/implicit/callback',
    clientId: '0oa4qw6inqps2eUgC4x6',
  },
  cognitoSettings: {
    identityPoolId: 'us-east-1:51af715f-31cf-4200-b43b-6c1ea1b62f5e',
    region: 'us-east-1',
    userPoolId: 'us-east-1_ObsPF5JdM'
  },
  panelsSettings: {
    openSearchDomain: 'search-classifieds-ui-prod-o5unofrr3c4qb3ykfrxebh2e4a',
    s3Bucket: 'classifieds-ui-prod',
    objectsRootUrl: 'https://rollthecloudinc.github.io/spearhead-objects-prod'
  },
  alienaliasSettings: {
    openSearchDomain: 'search-classifieds-ui-prod-o5unofrr3c4qb3ykfrxebh2e4a'
  },
  rumSettings: {
    appId: '',
    guestRoleArn: '',
    identityPoolId: '',
    region: ''
  },
  clientSettings: {
    authority: 'https://sso.druidcloud.io',
    client_id: '37lke0kuqac07fs1mk9mp2h471',
    redirect_uri: 'https://spearhead.druidcloud.io/auth-callback',
    silent_redirect_uri: 'https://spearhead.druidcloud.io/silent-refresh.html',
    response_type: "code",
    scope:"openid profile aws.cognito.signin.user.admin ads_api/ads_api taxonomy_api/taxonomy_api chat/chat media_api/media_api profiles_api/profiles_api", /*'ads_api media_api chat IdentityServerApi taxonomy_api api_gateway",*/
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    stateStore: undefined,
    userStore: undefined,
    metadata: {
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ObsPF5JdM",
      authorization_endpoint: "https://sso.druidcloud.io/oauth2/authorize",
      userinfo_endpoint: "https://sso.druidcloud.io/oauth2/userInfo",
      end_session_endpoint: "https://sso.druidcloud.io/logout",
      token_endpoint: "https://sso.druidcloud.io/oauth2/token",
      jwks_uri: "https://sso.druidcloud.io/us-east-1_z8PhK3D8V"
    },
    signingKeys: signingKeys.keys
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
