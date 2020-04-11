import tpl from './index.tpl';
import './index.scss';

import { DetailTitle } from './detail_title';
import { ContentItem } from './content_item';
import { BtnGroup } from './btn_group';

import { DetailModel } from '../../models/detail';

import tools from '../../utils/tools';

class DetailBoard {
  constructor (el, phoneInfo) {
  	this.name = 'DetailBoard';
  	this.phoneInfo = phoneInfo;
    this.$el = el;
    this.detailModel = new DetailModel();
  }

  init () {
    this.initphoneInfo();
    this.render();
    this.initUserPhoneInfo();
    this.bindEvent();
  }

  initphoneInfo () {
    const phoneInfo = this.phoneInfo;

    this.phoneInfo.color = $.parseJSON(phoneInfo.color);
    this.phoneInfo.version_info = $.parseJSON(phoneInfo.version_info);
    this.phoneInfo.pics = $.parseJSON(phoneInfo.pics);
  }

  initUserPhoneInfo () {
    const phoneInfo = this.phoneInfo,
          versions = phoneInfo.version_info;

    this.userPhoneInfo = {
      id: phoneInfo.id,
      name: phoneInfo.phone_name,
      link: window.location.href,
      price: versions[0].price,
      version: versions[0].version,
      color: phoneInfo.color[0],
      img: phoneInfo.pics[0][0][0]
    }
  }

  render () {
  	const contentItem = new ContentItem(),
          detailTitle = new DetailTitle(),
          btnGroup = new BtnGroup(),
  	      phoneInfo = this.phoneInfo;

  	let versionList = '',
  	    colorList = '';

    phoneInfo.color.forEach((item, idx) => {
      colorList += contentItem.tpl(item, null, phoneInfo.pics[idx][idx][0], phoneInfo.phone_name, idx);
    });

    phoneInfo.version_info.forEach((item, idx) => {
      versionList += contentItem.tpl(item.version, item.price, null, phoneInfo.phone_name, idx);
    });

    this.$el.append(tools.tplReplace(tpl(), {
    	pic_url: phoneInfo.pics[0][0][0],
    	phone_name: phoneInfo.phone_name,
    	slogan: phoneInfo.slogan,
    	default_price: phoneInfo.default_price,
    	title_1: detailTitle.tpl('手机版本'),
    	title_2: detailTitle.tpl('手机颜色'),
    	colors: colorList,
    	versions: versionList,
      btnGroup: btnGroup.tpl()
    }));
  }

  bindEvent () {
    const $versions = this.$el.find('.J_versions'),
          $colors = this.$el.find('.J_colors'),
          $btnGroup = this.$el.find('.J_btnGroup');

    this.versionItems = $versions.children('.content-item');
    this.colorItems = $colors.children('.content-item');
    this.detailPic = this.$el.find('.J_detailPic');

    $versions.on('click', '.content-item', { _this: this }, this.onVersionsClick);
    $colors.on('click', '.content-item', { _this: this }, this.onColorsClick);
    $btnGroup.on('click', '.detail-btn', { _this: this }, this.onBtnsClick);
  }

  onVersionsClick (ev) {
    const e = ev || window.event,
          _this = e.data._this;

    _this.versionChange(this);
  } 

  onColorsClick (ev) {
    const e = ev || window.event,
          _this = e.data._this;

    _this.colorChange(this);
  }

  onBtnsClick (ev) {
    const e = ev || window.event,
          _this = e.data._this,
          field = $(this).attr('data-field');

    switch (field) {
      case 'purchase':
        _this.purchase();
        break;
      case 'addToCart':
        _this.addToCart();
        break;
    }
  }

  versionChange (target) {
    const $target = $(target),
          curIdx = $target.index();

    this.userPhoneInfo.version = $target.attr('data-content');
    this.userPhoneInfo.price = $target.attr('data-price');

    this.versionItems.eq(curIdx).addClass('current')
                     .siblings('.content-item').removeClass('current');
  }

  colorChange (target) {
    const $target = $(target),
           curIdx = $target.index();

    this.userPhoneInfo.color = $target.attr('data-content');
    this.userPhoneInfo.img = $target.attr('data-pic');
    
    this.detailPic.attr('src', this.userPhoneInfo.img);
    this.colorItems.eq(curIdx).addClass('current')
                   .siblings('.content-item').removeClass('current');
  }

  purchase () {
    this.detailModel.purchase(this.userPhoneInfo, true, () => {
      window.location.href = 'order.html';
    });
  }

  addToCart () {
    this.detailModel.addToCart(this.userPhoneInfo, () => {
      window.location.href = 'cart.html';
    });
  }
}

export { DetailBoard };


















