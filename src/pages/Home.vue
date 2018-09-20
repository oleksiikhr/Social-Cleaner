<template>
  <div id="home">
    <header class="header">
      <h1 class="header__title">Social Cleaner <span class="header__title__version">{{ packageJson.version }}</span></h1>
      <p class="header__description">{{ packageJson.description }}</p>
      <router-link 
        :to="{ name: 'explore' }" 
        class="header__button">{{ $t('app.home.header.button') }}</router-link>
    </header>
    <section class="section section-works">
      <h2><span>{{ $t('app.home.works.title') }}</span></h2>
      <div class="section-works__list">
        <div 
          v-for="(item, index) in works" 
          :key="index" 
          class="work-item">
          <div class="work-item__content">
            <component 
              :is="item.icon" 
              class="work-item__content__icon" />
            <div class="work-item__content__name">{{ $t(`app.home.works.items[${index}]`) }}</div>
          </div>
          <div 
            v-if="item.next" 
            class="work-item__next">
            <component :is="item.next" />
          </div>
        </div>
      </div>
    </section>
    <section class="section section-benefits">
      <h2><span>{{ $t('app.home.benefits.title') }}</span></h2>
      <div class="section-benefits__list">
        <div 
          v-for="(item, index) in benefits" 
          :key="index" 
          class="benefit-item">
          <div class="benefit-item__header">
            <component :is="item" />
            <span>{{ $t(`app.home.benefits.items[${index}].name`) }}</span>
          </div>
          <p class="benefit-item__content">{{ $t(`app.home.benefits.items[${index}].description`) }}</p>
        </div>
      </div>
    </section>
    <section class="section section-contributors">
      <h2><span>{{ $t(`app.home.contributors.title`) }}</span></h2>
      <div class="section-contributors__list">
        <a 
          v-for="(item, index) in contributors" 
          :key="index" 
          :href="getGithubProfile(item.login)"
          :title="item.login" 
          target="_blank" 
          rel="noopener" 
          class="contributor-item">
          <img 
            :src="item.avatar_url" 
            :alt="item.login">
          <div class="contributor-item__svg"><external-link /></div>
        </a>
      </div>
    </section>
    <div class="block block-action">
      <router-link 
        :to="{ name: 'explore' }" 
        class="block-action__link">{{ $t(`app.home.action`) }}</router-link>
    </div>
  </div>
</template>

<script>
import { GITHUB_DOMAIN, fetchContributors } from '../scripts/github'
import { SECONDS_NOW, SECONDS_DAY } from '../scripts/time'
import ConfiguratorIcon from '../svg/Configurator'
import SecuritySSLIcon from '../svg/SecuritySSL'
import GearOutlineIcon from '../svg/GearOutline'
import TranslationIcon from '../svg/Translation'
import LineGraphicIcon from '../svg/LineGraphic'
import ExternalLink from '../svg/ExternalLink'
import GithubIcon from '../svg/brands/Github'
import RightIcon from '../svg/arrows/Right'
import OnePageIcon from '../svg/OnePage'
import WebDesign from '../svg/WebDesign'
import packageJson from '../../package'
import LoadIcon from '../svg/Load'
import CodeIcon from '../svg/Code'
import BestIcon from '../svg/Best'
import TestIcon from '../svg/Test'

export default {
  components: {
    ExternalLink
  },
  data() {
    return {
      packageJson,
      contributors: [],
      works: [
        { icon: GearOutlineIcon, next: RightIcon },
        { icon: CodeIcon, next: RightIcon },
        { icon: LoadIcon }
      ],
      benefits: [
        BestIcon, GithubIcon, TestIcon, OnePageIcon, WebDesign, TranslationIcon, LineGraphicIcon, ConfiguratorIcon, SecuritySSLIcon
      ]
    }
  },
  mounted() {
    const storage = localStorage.getItem('contributors')

    try {
      const contributors = JSON.parse(storage)

      if (contributors.time && contributors.time > SECONDS_NOW) {
        this.contributors = contributors.items
        return
      }
    } catch(e) {
      return this.updateContributors()
    }

    this.updateContributors()
  },
  methods: {
    async updateContributors() {
      const res = await fetchContributors()

      if (res.status === 200) {
        this.contributors = res.data.map(item => {
          return { login: item.login, avatar_url: item.avatar_url, contributions: item.contributions }
        })

        localStorage.setItem('contributors', JSON.stringify({
          time: SECONDS_NOW + SECONDS_DAY * 7,
          items: this.contributors
        }))
      }
    },
    getGithubProfile(login) {
      return GITHUB_DOMAIN + login
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.header {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  &__title {
    position: relative;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #fff;
    margin: 0;
    font-size: 3rem;
    &__version {
      position: absolute;
      top: 0;
      right: -4rem;
      text-indent: 10px;
      font-size: 1.3rem;
      color: $color-warning;
    }
  }
  &__description {
    font-size: 1.5rem;
    margin: 30px 0 40px;
  }
  &__button {
    display: block;
    background: rgba(255, 255, 255, .9);
    padding: 13px;
    max-width: 250px;
    width: 100%;
    margin: 0 auto;
    color: $primary-color;
    font-weight: bold;
    text-transform: uppercase;
    transition: .3s;
    border-radius: 20px;
    &:hover {
      background: #fff;
    }
  }
}

.section {
  > h2 {
    position: relative;
    margin: 100px 0;
    font-size: 1.8rem;
    text-transform: uppercase;
    cursor: context-menu;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      border: 1px solid #fff;
    }
    > span {
      position: relative;
      background: $primary-color;
      padding: 0 20px;
      margin-left: 50px;
    }
  }
}

.section-works__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
  min-height: 250px;
}

.work-item {
  display: flex;
  align-items: center;
  &__content {
    flex-grow: 1;
    &__icon {
      width: 70px;
      height: 70px;
    }
    &__name {
      font-weight: bold;
      font-size: 1.5rem;
      margin: 15px 0;
    }
  }
  &__next {
    line-height: 0;
  }
}

.section-benefits__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.benefit-item {
  padding: 30px;
  background: rgba(0, 0, 0, .1);
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
  &__header {
    display: flex;
    align-items: center;
    > svg {
      min-width: 40px;
      max-width: 40px;
      min-height: 40px;
      max-height: 40px;
      margin-right: 15px;
    }
    > span {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
  > p {
    margin-bottom: 0;
  }
}

.contributor-item {
  position: relative;
  display: inline-block;
  margin: 0 15px 15px 0;
  line-height: 0;
  border-radius: 50%;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    opacity: 0;
    transition: .2s;
  }
  &:hover {
    &:before {
      opacity: 1;
    }
    > .contributor-item__svg {
      opacity: 1;
    }
  }
  > img {
    max-width: 80px;
    border-radius: 50%;
  }
  &__svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    border-radius: 50%;
    transition: .2s;
    > svg {
      min-width: 20px;
      max-width: 20px;
      min-height: 20px;
      max-height: 20px;
    }
  }
}

.block-action {
  margin: 100px 0 0;
  &__link {
    display: block;
    padding: 20px 50px;
    margin: 0 auto;
    text-align: center;
    background: rgba(0, 0, 0, .1);
    font-weight: bold;
    font-size: 1.4rem;
    border-radius: 0;
    text-transform: uppercase;
    &:hover {
      background: rgba(0, 0, 0, .2);
    }
  }
}

@media only screen and (max-width: $laptop) {
  .section {
    h2 {
      text-align: center;
      > span {
        margin: 0;
      }
    }
  }
  .section-works__list {
    grid-template-columns: 1fr;
  }
  .work-item {
    flex-direction: column;
    &__next {
      transform: rotate(90deg);
      margin: 25px 0;
    }
  }
  .section-benefits__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: $tablet) {
  .header {
    min-height: 500px;
    &__title {
      font-size: 2.5rem;
    }
  }
  .section-benefits__list {
    grid-template-columns: 1fr;
  }
  .header__title__version {
    position: relative;
    display: block;
    right: 0;
  }
}

@media only screen and (max-width: $mobileM) {
  .section h2 {
    margin: 50px 0;
    > span {
      padding: 0;
    }
    &:before {
      content: none;
    }
  }
  .block-action {
    margin-top: 50px;
    &__link {
      padding: 20px;
    }
  }
}
</style>
