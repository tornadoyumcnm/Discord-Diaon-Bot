class PrefixCommand {
    constructor(client, {
      commands = null
    }){
      this.conf = {
        commands
      }
    }
    async execute(){
  
    }
  }

  class Event {
    constructor(client, {
      name = null
    }){
      this.conf = {
        name
      }
    }
    async execute (){
  
    }
  }
  
module.exports = { PrefixCommand, SlashCommand, Event };