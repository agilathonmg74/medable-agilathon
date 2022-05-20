
# medable - agilathon

  

intent to contain different helpers and snippets for agilathon-medable ecosystem.

  

## Description

  

Different helpers and snippets for agilathon-medable ecosystem.

  
  

# VS Code Snippets

collection of vs code snippets for axon medable framework contained in ./snippets/snippets.code-snippets/

### Usage

- download VS Code extension (.vsix file) from [Releases](https://github.com/agilathonmg74/medable-agilathon/releases)
- open VS Code
- press CMD-SHIFT P to open the command list
- type "Install from VSIX" until the correct command appears and select it
- select the VSIX file you downloaded from above

### Development

- add new snippets to *snippets.code-snippets* file
- increment version in *package.json* file
- add changes to the changelog file (CHANGELOG.md)
- install *vsce* tool for packaging VS Code extensions using `npm install -g vsce` (use Node version 16.+)
- run `vsce package` command that will generate `medable-cs-code-snippets-[version].vsix` file
- publish new version to [Releases](https://github.com/agilathonmg74/medable-agilathon/releases)

## Commands
    md query - choose object, method and access level
    md accessLevels
    md objects - choose object
    md trigger task - trigger on one task
    md trigger event single - trigger for event on single task
    md trigger event multiple - trigger for event on multiple tasks
    md config - import config
    md debug - import debug
    md moment - import moment
    md find 
    md insert
    md update
    md readOne
    md delete
    md event create
    md payload - create payload for ats notifications
    md script.as
    md arrowFunction
    md class - create class with static method
    md ternary
    md get account
    md get event - c_event
    md get Event
    md get patient flag
    md get task assignment
    md get site
    md get study
    md get anchor date
    md trigger task response - trigger on task response
    md notif schedule - schedule c_notif
    md notif cancel - cancel c_notif
    md get publicuser
    md update publicuser
    md get task
    md get task response
    md get step
    md get step response
    md update task response
    md underscore
    md trigger events
    md assert
    md logger
    md logLevels
    md comment header
    md decorators
    md job
    md moment now
    md moment schedule
    md route create
    md faults
    md event find

### Addtional

  

- for generating code snippets use web tool [snippet generator app](https://snippet-generator.app/)

- for snippet customisation check links ['Snippets in Visual Studio Code'](https://code.visualstudio.com/docs/editor/userdefinedsnippets) and ['Definitive guide to snippets visual studio code'](https://www.freecodecamp.org/news/definitive-guide-to-snippets-visual-studio-code/)

  
  

## Authors

  

Contributors names and contact info

  

to be ...

  

## Version History

  

to be ...

  

## License

  

None

## Acknowledgments

  

Inspiration, code snippets, etc.

* [snippet generator app](https://snippet-generator.app/)

* [Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

* [Definitive guide to snippets visual studio code](https://www.freecodecamp.org/news/definitive-guide-to-snippets-visual-studio-code)

* [Generate VS Code snippet package](https://medium.com/@makhmud.islamov/publish-your-vs-code-snippet-extension-in-4-steps-2ed7cc4fccc3)