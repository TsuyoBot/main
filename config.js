// Put member IDs in these for special perms, competely optional
const config = {
  'owners': ['191517443519152129', '493922020783030282'],
  'managers': [],
  'admins': [],
  'devs': ['160357118539595776', '291272018773671937'],
  'mods': [],
  'support': [],
  'helpers': [],
  'token': [],
  
  'blacklisted': [],
  
  'defaultSettings' : {
    'prefix': '::',
    'modLogChannel': 'mod-log',
    'modRole': 'Moderator',
    'adminRole': 'Administrator',
    'muteRole': 'Muted',
    'noPermissionNotice': 'true',
    'welcomeChannel': 'general',
    'welcomeMessage': 'Welcome to the server {{mention}}!',
    'welcomeEnabled': 'true',
    'logMessageUpdates': 'true',
	'logChannelUpdates': 'true',
    'logEmojiUpdates': 'true',
    'logMemberUpdates': 'true',
    'starboardChannel': 'starboard'
  },

  permLevels: [
    { level: 0,
      name: 'Blacklisted',
     
      check: () => true
    },
    
    { level: 1,
      name: 'User',
     
      check: (message) => !config.blacklisted.includes(message.author.id) || !config.globalBan.includes(message.author.id)
    },

    { level: 2,
      name: 'Moderator',

      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id) || message.member.hasPermission('MANAGE_MESSAGES')) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: 'Administrator',
     
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase())
          if (message.member.roles.has(adminRole.id) || message.member.hasPermission('ADMINISTRATOR')) return true;
        } catch (e) {
          return false;
        }
      }
    },
    
    { level: 4,
      name: 'Server Owner', 
     
      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    
    { 
      level: 5,
      name: 'Bot Helper',
      
      check: (message) => config.helpers.includes(message.author.id)
    },
    
    { 
      level: 6,
      name: 'Bot Support',
      
      check: (message) => config.support.includes(message.author.id)
    },

    { 
      level: 7,
      name: 'Bot Moderator',
      
      check: (message) => config.mods.includes(message.author.id)
    },
    
    { 
      level: 8,
      name: 'Bot Dev',
      
      check: (message) => config.devs.includes(message.author.id)
    },
    
    {
      level: 9,
      name: 'Bot Admin',
     
      check: (message) => config.admins.includes(message.author.id)
    },
    
    {
      level: 10,
      name: 'Bot Manager',
     
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 11,
      name: 'Bot Owner',
     
      check: (message) => config.owners.includes(message.author.id)
    }
  ]
};

module.exports = config;
