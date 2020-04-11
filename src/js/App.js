import '../scss/common.scss';
import { IndexModel } from '../models/index'; 

class App {
  constructor($, app, options) {
	  this.$app = $('<div id="app">');
	  this.swiper = options.swiper;
	  this.phone = options.phone;
	  this.field = options.field;
	  this.cache = null;

	  this.init();
	}

	async init () {
    await this.getDatas();
    this.render();
  }

	async getDatas () {
    const indexModel = new IndexModel();

    const data = await indexModel.getDatas({
      swiper: this.swiper,
      phone: this.phone,
      field: this.field
    });

    this.cache = {
      phoneDatas: data.phone_data || null,
      fieldDatas: data.field_data || null,
      swiperDatas: data.swiper_data || null
    }
	}
}

export { App };