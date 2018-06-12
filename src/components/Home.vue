<template>
  <div id="home">
    <!--TODO-->
    <header>
      <div class="header__inner">
        <h1>Social Cleaner <span>{{ version }}</span></h1>
        <h2>Очистка аккаунтов или групп из различных социальных сетей</h2>
        <router-link :to="{ name: 'explore' }" class="header__button">Explore</router-link>
      </div>
    </header>
    <!--TODO-->
    <section class="section section-works">
      <div class="section__inner">
        <h3 class="section__title">Как это работает</h3>
      </div>
    </section>
    <section class="section section-benefits">
      <div class="section__inner">
        <h3 class="section__title">Преимущества</h3>
        <div class="list-benefits">
          <div class="benefit" v-for="benefit in benefits" :key="benefit.name">
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
      words: [

      ],
      benefits: [
        { name: 'Бесплатно', icon: 'bomb', description: 'Серьезно, никакой оплаты.' },
        { name: 'Open-source', icon: 'github', description: 'Весь исходный код доступен в Github.' },
        { name: 'Хранение данных', icon: 'database', description: 'Все ваши данные на сайте удалятся даже после перезагрузки страницы.' },
        { name: 'Проверка удаляемых записей', icon: 'filter', description: 'Вы получите список удаляемых постов, в зависимости от ваших настроек.' },
        { name: 'Локализация', icon: 'language', description: 'Сервис доступен на различных языках.' },
        { name: 'Гибкость', icon: 'cogs', description: 'Глубокая настройка удаляемых записей, которые не дают сервисы.' },
        { name: 'Никакой аналитики', icon: 'eye-slash', description: 'Внутренней или внешней (Google analytics) - никто не собирает данные о вас.' },
        { name: 'Https', icon: 'shield', description: 'Все запросы к сервису зашифрованы по протоколу https.' },
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
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 450px;
  background: linear-gradient(to left, #525252, #3d72b4);
  .header__inner {
    max-width: 500px;
    > h1 {
      color: rgba(255, 255, 255, .9);
      font-size: 1.7rem;
    }
    > h2 {
      color: rgba(255, 255, 255, .7);
      font-size: 1.5rem;
    }
    > .header__button {
      display: block;
      background: #fff;
      padding: 10px;
      max-width: 200px;
      width: 100%;
      margin: 0 auto;
      color: #222;
      font-weight: bold;
    }
  }
}

.section {
  border: 1px solid #e7e7e7;
  border-left: 0;
  border-right: 0;
  .section__inner {
    max-width: 1600px;
    margin: 0 auto;
  }
  .section__title {
    text-align: center;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    padding: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}

/*
 * Benefits
 */

.section-benefits {
  background: linear-gradient(to left, #525252, #3d72b4);
  padding: 20px 0;
  .section__title {
    padding-bottom: 30px;
  }
}

.list-benefits {
  display: flex;
  flex-wrap: wrap;
  > .benefit {
    flex: 1;
    min-width: 30%;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
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
