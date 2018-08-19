<template>
  <div id="home" class="landing-page">
    <header>
      <div class="header__inner">
        <h1 class="header__name">Social Cleaner <span class="header__version">{{ version }}</span></h1>
        <p class="header__description">{{ $t('app.home.header.description') }}</p>
        <router-link :to="{ name: 'explore' }" class="header__button">{{ $t('app.home.header.button') }}</router-link>
      </div>
    </header>
    <section class="section section-works">
      <div class="section__inner">
        <h3 class="section__title">{{ $t('app.home.works.title') }}</h3>
        <div class="list-works">
          <div class="work" v-for="(work, index) in works" :key="index">
            <div class="work__inner">
              <div class="work__icon">
                <i :class="`fa fa-${work.icon}`" aria-hidden="true"></i>
              </div>
              <div class="work__name">{{ $t(`app.home.works.items[${index}].name`) }}</div>
              <div class="work__description">{{ $t(`app.home.works.items[${index}].description`) }}</div>
            </div>
            <div v-if="work.dot" class="work__dot">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-benefits">
      <div class="section__inner">
        <h3 class="section__title">{{ $t('app.home.benefits.title') }}</h3>
        <div class="list-benefits">
          <div class="benefit" v-for="(benefit, index) in benefits" :key="index">
            <span class="benefit__title">
              <i :class="`fa fa-${benefit}`" aria-hidden="true"></i>
              <span>{{ $t(`app.home.benefits.items[${index}].name`) }}</span>
            </span>
            <p>{{ $t(`app.home.benefits.items[${index}].description`) }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-action">
      <div class="section__inner">
        <span class="section__name">{{ $t('app.home.action.name') }}</span>
        <router-link class="section__link" :to="{ name: 'explore' }">{{ $t('app.home.action.button') }}</router-link>
      </div>
    </section>
    <footer-component color="white" />
  </div>
</template>

<script>
import FooterComponent from './footer/Index'
import { version } from '../config'

export default {
  components: {
    FooterComponent
  },
  data () {
    return {
      version,
      works: [
        { icon: 'key', dot: true },
        { icon: 'cogs', dot: true },
        { icon: 'spinner', dot: false }
      ],
      benefits: [
        'bomb', 'github', 'database', 'filter', 'language', 'cogs', 'eye-slash', 'shield', 'folder-open-o'
      ]
    }
  },
  activated () {
    this.$store.commit('SET_APP_CLASS', 'landing-page')
  },
  deactivated () {
    this.$store.commit('CLEAR_APP_CLASS')
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 450px;
  .header__inner {
    padding: 0 15px;
    max-width: 800px;
    > .header__name {
      font-size: 2.5rem;
      text-transform: uppercase;
      padding-bottom: 15px;
      color: rgba(255, 255, 255, .9);
      > .header__version {
        position: absolute;
        text-indent: 10px;
        font-size: 1rem;
        vertical-align: top;
        color: $color-warning;
      }
    }
    > .header__description {
      font-size: 1.3rem;
      padding-bottom: 25px;
    }
    > .header__button {
      display: block;
      background: rgba(255, 255, 255, .9);
      padding: 10px;
      max-width: 230px;
      width: 100%;
      margin: 0 auto;
      color: $primary-color;
      font-weight: bold;
      text-transform: uppercase;
      font-size: .8rem;
      transition: .3s;
      border-radius: 20px;
      &:hover {
        background: #fff;
      }
    }
  }
}

footer {
  max-width: $max-width;
  margin: 0 auto;
  padding: 15px 0;
}

#home {
  min-height: 100vh;
}

.section {
  padding-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  .section__inner {
    max-width: $max-width;
    margin: 0 auto;
    width: 100%;
  }
  .section__title {
    margin: 0;
    padding: 10px 10px 30px;
    color: rgba(255, 255, 255, .9);
    font-size: 1.4rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}

/*
 * Works
 */

.list-works {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  background: rgba(0, 0, 0, .1);
  box-shadow: $box-shadow2;
  padding: 40px 0;
  > .work {
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    padding: 10px;
    width: 100%;
    &:last-child:after {
      content: none;
    }
    .work__icon {
      text-align: center;
      > i {
        font-size: 2rem;
        margin-bottom: 20px;
      }
    }
    .work__name {
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    .work__dot {
      font-size: 1.3rem;
    }
  }
}

/*
 * Benefits
 */

.list-benefits {
  display: flex;
  flex-wrap: wrap;
  > .benefit {
    flex: 1;
    min-width: 31%;
    padding: 30px;
    background: rgba(0, 0, 0, .1);
    margin: 10px;
    border-bottom: 2px solid #181c20;
    > span {
      display: block;
      margin-bottom: 10px;
      font-size: 1.2rem;
      color: rgba(255, 255, 255, .9);
    }
    > p {
      color: rgba(255, 255, 255, .7);
    }
    .benefit__title {
      > i {
        margin-right: 5px;
      }
    }
  }
}

/*
 * Action
 */

.section-action {
  max-width: 1000px;
  margin: 0 auto;
  .section__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    background: rgba(0, 0, 0, .1);
    box-shadow: $box-shadow2;
    > .section__name {
      font-size: 1.4rem;
      margin-right: 15px;
    }
    > .section__link {
      padding: 10px 30px;
      border: 1px solid transparent;
      background: rgba(0, 0, 0, .2);
      min-width: 200px;
      text-align: center;
      transition: .2s;
      &:hover {
        background: rgba(0, 0, 0, .3);
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .section {
    padding-bottom: 40px;
    .section__title {
      text-align: center;
    }
  }
  .list-works {
    flex-direction: column;
    .work {
      flex-direction: column;
      .work__dot {
        transform: rotate(90deg);
        margin: 30px 0;
      }
    }
  }
  .header__version {
    display: block;
    position: inherit !important;
    vertical-align: unset !important;
  }
  .list-benefits > .benefit {
    min-width: 100%;
    margin: 10px 0;
  }
  .section-action .section__inner {
    flex-direction: column;
    > .section__name {
      text-align: center;
      margin: 0 0 20px;
    }
  }
}
</style>
