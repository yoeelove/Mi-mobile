import { App } from './App';

import { Header } from '../components/header';
import { OrderBoard } from '../components/order_board';
import { Footer } from '../components/footer';

class Order extends App {
	constructor($, app) {
	  super($, app, {
	  	swiper: false,
	  	phone: true,
	  	field: true
	  });
	}

	render () {
		new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
	  new OrderBoard(this.$app).init();
	  new Footer(this.$app).init();

	  $('body').prepend(this.$app);
	}
}

new Order(jQuery);