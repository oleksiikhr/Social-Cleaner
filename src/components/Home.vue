<template>
  <div id="home">
    <!--TODO-->
    <header>
      <div class="header__inner">
        <h1 class="header__name">Social Cleaner <span class="header__version">{{ version }}</span></h1>
        <p class="header__description">
          Сервис для очистки данных с различных социальный сетей.
        </p>
        <router-link :to="{ name: 'explore' }" class="header__button">Explore</router-link>
      </div>
    </header>
    <!--TODO-->
    <section class="section section-works">
      <div class="section__inner">
        <h3 class="section__title">Как это работает</h3>
        <div class="list-works">
          <div class="work" v-for="work in works" :key="work.icon">
            <div class="work__inner">
              <div class="work__icon">
                <i :class="`fa fa-${work.icon}`" aria-hidden="true"></i>
              </div>
              <div class="work__name">{{ work.name }}</div>
              <div class="work__description">{{ work.description }}</div>
            </div>
            <div v-if="work.dot" class="work__dot">
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-benefits">
      <div class="section__inner">
        <h3 class="section__title">Преимущества</h3>
        <div class="list-benefits">
          <div class="benefit" v-for="benefit in benefits" :key="benefit.icon">
            <span class="benefit__title">
              <i :class="`fa fa-${benefit.icon}`" aria-hidden="true"></i>
              <span>{{ benefit.name }}</span>
            </span>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { version } from '../config'

export default {
  data () {
    return {
      version,
      works: [
        { name: 'Получение токена', icon: 'key', description: 'Получите токен для своего аккаунта в нужной социальной сети.', dot: true },
        { name: 'Настройка аккаунта', icon: 'cogs', description: 'Выберите раздел для очистки и настраиваете нужные параметры.', dot: true },
        { name: 'Ожидание очистки', icon: 'spinner', description: 'Запустите процесс очистки и ожидайте завершение процесса.' }
      ],
      benefits: [
        { name: 'Бесплатно', icon: 'bomb', description: 'Серьезно, никакой оплаты, все возможности доступны каждому.' },
        { name: 'Open-source', icon: 'github', description: 'Весь исходный код доступен в Github.' },
        { name: 'Очистка данных', icon: 'database', description: 'Все ваши данные на сайте удалятся даже после перезагрузки страницы.' },
        { name: 'Проверка перед удалением', icon: 'filter', description: 'Вы получите список удаляемых постов, в зависимости от ваших настроек.' },
        { name: 'Локализация', icon: 'language', description: 'Сервис доступен на различных языках.' },
        { name: 'Гибкая настройка', icon: 'cogs', description: 'Глубокая настройка удаляемых записей, которые не предоставляют сервисы.' },
        { name: 'Никакой аналитики', icon: 'eye-slash', description: 'Внутренней или внешней (Google analytics) - никто не собирает данные о вас.' },
        { name: 'SSL - шифрование', icon: 'shield', description: 'Все запросы к сервису зашифрованы по протоколу https.' },
        { name: 'Журнал запросов', icon: 'folder-open-o', description: 'Получение информации о всех запросах / ответах от социальных сетей.' }
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
$shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 450px;
  .header__inner {
    max-width: 800px;
    > .header__name {
      color: rgba(255, 255, 255, .9);
      font-size: 2.5rem;
      text-transform: uppercase;
      padding-bottom: 15px;
      > .header__version {
        position: absolute;
        text-indent: 10px;
        font-size: 1rem;
        vertical-align: top;
        color: #ffa9a9;
      }
    }
    > .header__description {
      color: rgba(255, 255, 255, .7);
      font-size: 1.3rem;
      padding-bottom: 25px;
    }
    > .header__button {
      display: block;
      border: 1px solid #fff;
      background: rgba(255,255,255,.05);
      padding: 12px;
      max-width: 230px;
      width: 100%;
      margin: 0 auto;
      color: #fff;
      font-weight: bold;
      transition: .3s;
      &:hover {
        background: #fff;
        color: #406da5;
      }
    }
  }
}

.section {
  padding: 80px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .section__inner {
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }
  .section__title {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    padding: 10px 10px 30px;
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
  box-shadow: $shadow;
  padding: 40px 0;
  > .work {
    color: rgba(255, 255, 255, 0.8);
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
    min-width: 30%;
    padding: 30px;
    box-shadow: $shadow;
    background: rgba(0, 0, 0, .1);
    margin: 10px;
    > span {
      display: block;
      margin-bottom: 10px;
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.87);
    }
    > p {
      color: rgba(255, 255, 255, 0.7);
    }
    .benefit__title {
      > i {
        margin-right: 5px;
      }
    }
  }
}
</style>
