// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { GlobalErrorHandler } from '@classifieds-ui/logging';

// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
const signingKeys = {"keys":[{"alg":"RS256","e":"AQAB","kid":"AVAUnZnRHZ8veNowR0ULe3nfieaPTVZjW6NExDWSL6w=","kty":"RSA","n":"uZSXpyh0F9VvD4-C_yV5_to_EbAETXYgARdA0iGcaQ9TYjt1T3VANDCfl2vQpWw4vo41a_R76hbIIPhyqAJHszGnz7eBa-2-8uHL46AOcw7Gwqg41jq-Bmd-GWH_ORoPmnraj3SUzY1JtczajD4iIiYdgNh-VL50qaaJX-vHu6nJlAjSqL4bG9BZa6teFI5lZctqqHP3iDwuXmq_2g1pHlslnLd3xG5LN7UOCDoGcW9BlU5NyhPV-A36eRC6N0ojLPjkQlunNKON3Q9DEHKqKIVXoLBBTHkPRwWfpXy2x539qJhaEHhedG07y7JLRHbooIL8x4QhnTec1B058ul6rw","use":"sig"},{"alg":"RS256","e":"AQAB","kid":"xohxFggNLGhhDsMbcn60ZimMxOSpKGVAxuobUx6V6QQ=","kty":"RSA","n":"vozfe7EyR0LXiawHaCtW6SnX77KpVfyXz3DHEZGZVBt5FiFMD1pOdQ4BG17Ap05tYTIns09TrFTnULYrqjcjO0mxoYNgFQu6dgBkwGfoEzZdh8PL4bHEwrQAUfwgV6i2po1zateyhPuDWVi_8UBsy0E7UEez9velmh8L9dPUbMhzyewXXTG2tm0DbgR5ZXXpyM8WbGZjHnGIF_Zv6dnwfsTbM-dQmPH6The5UAVCt1xA0N4ZWGzSN1Rl1GIRLURVPjSXqiJt4er7qsngRkOOE083RuYb5Ge8sY_TzaKmr0UN6q_2GOhYCUkKT7Cd4mg6kv0tp8wXG_awfgRDMVPhNw","use":"sig"}]}

export const environment = {
  production: false,
  site: 'spearhead',
  apiGatewaySettings: {
    // endpointUrl: 'https://localhost:44340',
    endpointUrl: "https://m7k310bu9a.execute-api.us-east-1.amazonaws.com/rollthecloudinc/spearhead-objects/shapeshifter"
  },
  mediaSettings: {
    endpointUrl: 'https://m7k310bu9a.execute-api.us-east-1.amazonaws.com/spearhead/media',
    cloudinaryUrl: 'https://api.cloudinary.com/v1_1/dj4vvkgzw',
    uploadPreset: 'i0hm4opm',
    imageUrl: 'https://m7k310bu9a.execute-api.us-east-1.amazonaws.com/spearhead',
    bucket: 'classifieds-ui-dev',
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
    endpointUrl: "https://localhost:44340/logging"
  },
  chatSettings: {
    endpointUrl: "wss://61rdyvvayj.execute-api.us-east-1.amazonaws.com/dev"
  },
  oktaSettings: {
    redirectUri: 'http://localhost:4000/implicit/callback',
    clientId: '0oa33yn39XtrnvY774x6',
  },
  cognitoSettings: {
    identityPoolId: 'us-east-1:026caf18-c852-451b-a93e-fb431c4eee6d',
    region: 'us-east-1',
    userPoolId: 'us-east-1_sWRV0kAgS'
  },
  panelsSettings: {
    openSearchDomain: 'search-classifieds-ui-dev-eldczuhq3vesgpjnr3vie6cagq',
    s3Bucket: 'classifieds-ui-dev',
    objectsRootUrl: 'https://rollthecloudinc.github.io/spearhead-objects'
  },
  alienaliasSettings: {
    openSearchDomain: 'search-classifieds-ui-dev-eldczuhq3vesgpjnr3vie6cagq'
  },
  rumSettings: {
    appId: '',
    guestRoleArn: '',
    identityPoolId: '',
    region: ''
  },
  clientSettings: {
    authority: 'https://precheck-local67.auth.us-east-1.amazoncognito.com',
    client_id: '7h778muira8dkr69dt35jhbjo8',
    redirect_uri: 'http://localhost:4000/auth-callback',
    silent_redirect_uri: 'http://localhost:4000/silent-refresh.html',
    response_type: "code",
    scope:"openid email profile", /*'ads_api media_api chat IdentityServerApi taxonomy_api api_gateway",*/
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    stateStore: undefined,
    userStore: undefined,
    metadata: {
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sWRV0kAgS",
      authorization_endpoint: "https://precheck-local67.auth.us-east-1.amazoncognito.com/oauth2/authorize",
      userinfo_endpoint: "https://precheck-local67.auth.us-east-1.amazoncognito.com/oauth2/userInfo",
      end_session_endpoint: "https://precheck-local67.auth.us-east-1.amazoncognito.com/logout",
      token_endpoint: "https://precheck-local67.auth.us-east-1.amazoncognito.com/oauth2/token",
      jwks_uri: "https://precheck-local67.auth.us-east-1.amazoncognito.com/us-east-1_sWRV0kAgS"
    },
    signingKeys: signingKeys.keys
  }
};

const x = 'xxxxxxxxxxxxxxxxxxxxxsxxxx';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.  