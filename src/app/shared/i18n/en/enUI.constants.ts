import { IUITranslationKeys } from '@shared/models/translationKeys.models';

export const EN_UI_TRANSLATION: IUITranslationKeys = {
  menu: {
    new_world_btn: 'New Seed',
    continue_btn: 'Continue',
  },
  biomes: {
    desert: 'Desert',
    desert_island: 'Island',
    fjords: 'Mountains',
    highlands: 'Highlands',
    ocean: 'Ocean',
    rainforest: 'Rainforest',
    snowy_hills: 'Tundra',
    swamps: 'Swamp',
    taiga: 'Forest'
  },
  online: {
    count: 'Online : {{count}}',
    room_joined: 'New user joined',
    system_messages: {
      connection: '{{user}} joined the world',
      disconnection: '{{user}} left the world'
    }
  },
  trophy_unlocked: 'Trophy unlocked',
  home: {
    title: 'Mapp Maker',
    subtitle: 'Mappa Labs',
    debug: 'Debug',
    loading: 'Loading',
    form: {
      seed: 'Plant Seed',
      seed_placeholder: '',
      graphics: 'Graphics',
      high_quality_option: 'High',
      medium_quality_option: 'Medium',
      low_quality_option: 'Low',
      gamemode: 'Mode',
      singleplayer_option: 'Solo',
      multiplayer_option: 'Multiplayer',
      soundmode: 'Sound',
      sound_on_option: 'ON',
      sound_off_option: 'OFF',
      start_btn: 'Create',
      seed_tooltip_title: 'What is a seed?',
      seed_tooltip_text: 'Seeds are used to generate worlds. Seeds can contain numbers, words, emojis or a combination.'
    }
  },
  'trophies-tab': {
    title: 'Trophies',
    sort_by_type: 'Sort by type',
    sort_by_completion_status: 'Sort by completion status',
    sort_by_difficulty: 'Sort by difficulty',
    reset_title: 'Delete progress',
    reset_text: 'Your progress will be deleted and cannot be restored. Are you sure?',
    reset_btn: 'Delete Progress'
  },
  'tutorial-tab': {
    title: 'Help',
    tab1: {
      reset_btn: 'Restore Defaults',
      intro: 'To edit a control select it then press a key on your keyboard.',
      title_commands: 'Keys',
      subtitle_keyboard: 'Keyboard',
      subtitle_mouse: 'Mouse',
      actionkey: {
        down: 'Descend',
        up: 'Ascend',
        right: 'Right',
        left: 'Left',
        back: 'Backward',
        front: 'Forward',
        vocal: 'Hold to enable/disable voice',
        reload: 'Generate a new world',
        mute: 'Toggle sound',
        menu: 'Menu',
        freeze: 'Freeze/Unfreeze time',
        chat: 'Toggle chat'
      },
      'mouse_left-click': 'Place an object',
      'mouse_left-click_name': 'Left click',
      'mouse_right-click': 'Delete an object',
      'mouse_right-click_name': 'Right click',
      mouse_scroll: 'Change object',
      mouse_scroll_name: 'Scroll',
    },
    tab2: {
      intro: 'You can use your voice to perform certain actions by using the push-to-talk key “V” (by default). Make sure the application has access to your microphone.',
      subtitle: 'Voice commands',
      subtitle_a1: 'Place objects',
      subtitle_a2: 'Delete objects',
      subtitle_a3: 'Change time',
      subtitle_a4: 'Change current object',
      subtitle_a5: 'Freeze time',
      text_a1: 'To place an object, you must be at a proper distance from the ground, a green cursor should appear at the center of the screen if it’s the case. Then say “place”.',
      text_a2: 'To delete an object, once you are at a proper distance, an orange cursor should appear at the center of the screen. Then say “void”.',
      text_a3: 'To change the in-game time, say “night” or “day”.',
      text_a4: 'To cycle through the available objects, say "next".',
      text_a5: 'To freeze the time, say "freeze".',
    },
  },
  'home-tab': {
    title: 'About',
    about_title: 'Mapp Maker',
    seed: 'Seed used to generate the world',
    article: {
      title_project: 'ABOUT',
      title_objectives: 'TROPHIES',
      title_help: 'HELP',
      title_tech: 'Tech stack',
      title_code: 'Source code',
      p1: 'Mapp Maker generates random 3D worlds that you can customize with the help of ai and friends.',
      p2: 'Every time you plant a new seed, Mapp Maker will generate a new world. There are a total of 36 trophies you can earn across 8 different biomes. To generate a new world click the "New World" button. Multiplayer mode enables you to roam worlds with friends.',
      p3: 'Press ESC to close this menu and use your keyboard to move around. You can view all of the controls in the HELP tab.',
      p5: '3D world :',
      p6: 'Interface :',
      p7: 'Multiplayer :',
      p8: 'Voice recognition :'
    },
    share: {
      text: 'Share this world:'
    },
    copy_clipboard: 'Click to copy to your clipboard.'
  },
  'credits-tab': {
    title: 'Credits',
    description_marco: 'UI Engineer',
    description_jeremy: 'Project Owner/Analyst',
    description_kyle: 'UI/UX Designer',
    description_nick: 'Project Manager',
  },
  'progress-tab': {
    title: 'Progress',
    title_stats: 'Stats',
    title_biomes: 'Biomes visted',
    game_played: 'Worlds generated : {{count}}',
    distance_travelled: 'Distance travelled : {{count}} miles',
    going_underwater: 'Dove underwater : {{count}}',
    objects_placed: 'Objects placed : {{count}}',
    objects_placed_submarine: 'Objects placed underwater : {{count}}',
    objects_placed_voice: 'Objects placed with voice : {{count}}',
    objects_removed: 'Objects removed : {{count}}',
    unlock_trophies_percentage: 'Trophies unlocked : {{count}}%',
    play_online: 'Games played online : {{count}}',
  },
  'contact-tab': {
    title: 'Contact',
    header: 'Problem, question or feedback? Reach out below.',
    email: 'Email',
    subject: 'Subject',
    select: {
      bug: 'Bug',
      improvement: 'Improvement',
      other: 'Other'
    },
    message: 'Message',
    send: 'Send'
  },
  cookies: {
    more: 'Learn more',
    decline: 'Decline',
    allow: 'Allow cookies',
    message: 'We use cookies to measure how you interact with the worlds.'
  }
};
