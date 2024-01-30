import React, { createRef, useState } from 'react';
import queryString from 'query-string';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Button from '@components/button/button';
import UIManager from '@app/ui/UIManager';
import { UIStates } from '@ui/enums/UIStates.enum';
import { H2, H1 } from '@components/hx/hx';

import TrophiesTab from '@templates/menu/trophies-tab/trophies-tab';
import TutorialTab from '@templates/menu/tutorial-tab/tutorial-tab';
// import CreditsTab from '@templates/menu/credits-tab/credits-tab';
import ProgressTab from '@templates/menu/progress-tab/progress-tab';
// import ContactTab from '@templates/menu/contact-tab/contact-tab';
import HomeTab from '@templates/menu/home-tab/home-tab';

import PointerLock from '@app/PointerLock';

import { translationSvc } from '@app/shared/services/translation.service';
// icons
import IconClose from '!svg-react-loader!@images/ui_icons/close.svg';
import IconCrown from '!svg-react-loader!@images/ui_icons/crown.svg';
import IconDiscord from '!svg-react-loader!@images/ui_icons/discord.svg';
import IconMap from '!svg-react-loader!@images/ui_icons/map.svg';
import IconNavigate from '!svg-react-loader!@images/ui_icons/navigate.svg';
import IconTrophy from '!svg-react-loader!@images/ui_icons/trophy.svg';

import './menu.styles';

interface Props {
  uiManager: UIManager;
}
interface IconElement {
  className: string;
}

class Menu extends React.PureComponent<Props> {

  static SELECTED_INDEX: number = 0;
  private backdrop: React.RefObject<HTMLDivElement>;
  private bypassPress: Boolean;

  constructor(props) {
    super(props);
    this.backdrop = createRef();
    this.bypassPress = false;
  }

  changeMenuState = () => {
    const { uiManager } = this.props;
    if (this.bypassPress) return;
    uiManager.switchState(UIStates.GAME);
    PointerLock.request();
  }

  handleCloseBtnClick = () => {
    this.changeMenuState();
    this.bypassPress = false;
  }

  /*
  * this handler should be place upon any buttons that will
  * float in the UI outide of the modal/menus hit-zone. this
  * allows for click-outside to close modals
  * */
  handlePress = () => {
    console.log('BYPASS IS TRUE!!!!');
    this.bypassPress = true;
  }

  handleRelease = (e) => {

    const dialogDimensions = this.backdrop.current.getBoundingClientRect();
    // console.log(`bypress:${this.bypassPress} >> mouse.x:${e.clientX} mouse.y:${e.clientY} dimensions:`, dialogDimensions);
    if (this.bypassPress) return;
    if (
      (e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom) &&
      !this.bypassPress
    ) {
      this.changeMenuState();
      this.bypassPress = false;
      e.stopPropagation();
    }
  }

  reload = () => {
    const parsed = queryString.parse(location.search);
    parsed.seed = '';
    window.location.search = queryString.stringify(parsed); // TODO: this might need something better;
    this.bypassPress = false;
  }

  render() {
    const { uiManager } = this.props;

    // @ts-ignore
    return (
      <div className='ui__state menu' onMouseUp={this.handleRelease}>
        <div className='menu__container' ref={this.backdrop}>
          <Tabs defaultIndex={Menu.SELECTED_INDEX} onSelect={tabIndex => Menu.SELECTED_INDEX = tabIndex}>
            <TabList>
              <Tab>
                <div className='tabs-menu ui-click-sound'>
                  <IconMap />
                  <span className='tabs-menu__text'>{translationSvc.translate('UI.home-tab.title')}</span>
                </div>
              </Tab>
              <Tab>
                <div className='tabs-menu ui-click-sound'>
                  <IconNavigate />
                  <span className='tabs-menu__text'>{translationSvc.translate('UI.tutorial-tab.title')}</span>
                </div>
              </Tab>
              <Tab>
                <div className='tabs-menu ui-click-sound'>
                  <IconTrophy />
                  <span className='tabs-menu__text'>{translationSvc.translate('UI.trophies-tab.title')}</span>
                </div>
              </Tab>
              <Tab>
                <div className='tabs-menu ui-click-sound'>
                  <IconCrown />
                  <span className='tabs-menu__text'>{translationSvc.translate('UI.progress-tab.title')}</span>
                </div>
              </Tab>
            </TabList>
            <TabPanel>
              <div className='p-3 pb-9 pb-3-t'><HomeTab uiManager={uiManager}/></div>
            </TabPanel>
            <TabPanel>
              <div className='p-3 pb-9 pb-3-t'><TutorialTab/></div>
            </TabPanel>
            <TabPanel>
              <div className='p-3 pb-9 pb-3-t'><TrophiesTab/></div>
            </TabPanel>
            <TabPanel>
              <div className='p-3 pb-9 pb-3-t'><ProgressTab/></div>
            </TabPanel>
          </Tabs>
          <footer className='menu__footer mb-3 mr-3'>
            {/*<Button className='btn--theme btn--expand-mobile ui-click-sound' onMouseDown={this.handlePress} onClick={this.handleCloseBtnClick}>{translationSvc.translate('UI.menu.continue_btn')}</Button>*/}
            <Button className='btn--orange btn--expand-mobile btn--rounded mt-2 ui-click-sound' onMouseDown={this.handlePress} onMouseUp={this.reload}>{translationSvc.translate('UI.menu.new_world_btn')}</Button>
          </footer>

        </div>
      </div >
    );
  }

}

export default Menu;
