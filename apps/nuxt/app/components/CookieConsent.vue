<script setup>
const showCookieBanner = ref(false);

const analyticsConsent = useCookie("_analytics_cookie_consent");

const advertisingConsent = useCookie("_advertising_cookie_consent");

const { gtag } = useGtag();

// Check if user hasn't already responded:
if (import.meta.client) {
  if (
    advertisingConsent.value == undefined ||
    analyticsConsent.value == undefined
  ) {
    showCookieBanner.value = true;
  } else {
    gtag("consent", "update", {
      ad_user_data: advertisingConsent.value ? "granted" : "denied",
      ad_personalization: advertisingConsent.value ? "granted" : "denied",
      ad_storage: advertisingConsent.value ? "granted" : "denied",
      analytics_storage: analyticsConsent.value ? "granted" : "denied",
    });
  }
}

function accepted() {
  if (import.meta.client) {
    advertisingConsent.value = advertising.value;
    analyticsConsent.value = analytics.value;

    gtag("consent", "update", {
      ad_user_data: advertisingConsent.value ? "granted" : "denied",
      ad_personalization: advertisingConsent.value ? "granted" : "denied",
      ad_storage: advertisingConsent.value ? "granted" : "denied",
      analytics_storage: analyticsConsent.value ? "granted" : "denied",
    });

    showCookieBanner.value = false;
  }
}
function declined() {
  if (import.meta.client) {
    advertisingConsent.value = false;
    analyticsConsent.value = false;
    showCookieBanner.value = false;
  }
}

const showManageCookies = ref(false);
const analytics = ref(true);
const advertising = ref(true);
</script>

<template>
  <div
    v-show="showCookieBanner && showManageCookies"
    class="manage-popup-wrapper"
  >
    <div class="manage-popup">
      <span
        class="close-btn"
        @click="
          () => {
            showManageCookies = false;
          }
        "
        >&times;</span
      >
      <div class="cookie-type-header">
        <div class="heading">Necessary</div>
        <span>Always on</span>
      </div>
      <p>
        Required to enable core site functionality and to remember user
        preferences and choices, such as language preferences or customized
        settings.
      </p>

      <hr />
      <div class="cookie-type-header">
        <div class="heading">Performance and Analytics</div>
        <span>
          <input type="checkbox" v-model="analytics" />
        </span>
      </div>
      <p>
        These cookies provide quantitative measures of website visitors. With
        the usage of these cookies we are able to count visits and traffic
        sources to improve the performance of our site.
      </p>
      <hr />
      <div class="cookie-type-header">
        <div class="heading">Advertising</div>
        <span>
          <input type="checkbox" v-model="advertising" />
        </span>
      </div>
      <p>
        These cookies are used by advertising companies to serve ads that are
        relevant to your interests.
      </p>

      <div @click="accepted()">
        <BlockButton buttonStyle="dark" alignment="center" class="submit-button"
          >Save Preferences</BlockButton
        >
      </div>
    </div>
  </div>
  <div v-show="showCookieBanner" class="wrapper">
    <div class="content">
      <div>
        <h3>We value your privacy</h3>
        <p>
          We use cookies to enhance your browsing experience, security, and
          analyse our traffic. By clicking "Accept All", you consent to our use
          of cookies.
        </p>
      </div>
      <div class="button-wrap">
        <div
          @click="
            () => {
              showManageCookies = true;
            }
          "
        >
          <BlockButton buttonStyle="light" class="submit-button secondary"
            >Customise</BlockButton
          >
        </div>
        <div @click="declined()">
          <BlockButton buttonStyle="light" class="submit-button secondary"
            >Decline</BlockButton
          >
        </div>
        <div @click="accepted()">
          <BlockButton buttonStyle="dark" class="submit-button"
            >Accept All</BlockButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.secondary {
  background-color: #00000000;
}

.wrapper {
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 40px;
  width: calc(100% - 80px);
  max-width: 500px;
  display: flex;
  justify-content: center;
  color: #000;
  background-color: #d1cdcd;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0px 0px 18px #00000050;
}

.content {
  color: #000;
  padding: 40px 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: left;
  position: relative;
  p,
  h3 {
    margin-left: 20px;
  }
  h3 {
    margin-bottom: 10px;
    font-size: 24px;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -5.5px;
    left: 50%;
    background-size: contain;
    transform: translateX(-50%);
  }

  p {
    font-size: 16px;
    max-width: 800px;
    a {
      color: inherit;
      &:hover {
        color: #aaa;
      }
    }
  }
  .button-wrap {
    display: flex;
    flex-wrap: wrap-reverse;
    // flex-direction: row-reverse;
    gap: 0 20px;
    justify-content: center;
    align-items: center;
  }
}

button {
  padding: 10px 30px;
  font-weight: 900;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(115%);
  }
}
.submit-button {
  // background-color: #000;
  // border: 2px solid #000;
  // color: #ffffff;
  padding: 9px 20px;
  // width: 130px;
  min-width: 150px;
  min-height: 60px;
  font-size: 20px;
  line-height: 1.2;
  &.secondary {
    font-size: 18px;
    min-width: 130px;
    min-height: 45px;
    background-color: #000000;
    color: #000;
    border: 1px solid #000;
  }
}

.manage-popup-wrapper {
  position: fixed;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background-color: #2828288e;
  color: #000;

  hr {
    opacity: 0.3;
  }
  .heading {
    font-size: 24px;
  }
  p {
    font-size: 16px;
  }
}

.manage-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: #d1cdcd;
  padding: 40px;
  z-index: 1002;
  width: 100%;
  max-width: 700px;
  margin: auto;
  p {
    margin: 20px 0;
  }
}

.close-btn {
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  font-size: 30px;
  line-height: 0.7;
  position: absolute;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
}

.cookie-type-header {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

input[type="checkbox"] {
  height: 20px;
  width: 20px;
}
</style>
