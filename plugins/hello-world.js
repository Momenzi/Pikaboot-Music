import { PikabootPlugin } from '../plugin-manager.js';
import { showNotification } from '../downloads.js';

export class HelloWorldPlugin extends PikabootPlugin {
    constructor() {
        super({
            id: 'hello-world',
            name: 'Hello World',
            version: '1.0.0',
            author: 'Example User',
            description: 'A simple example plugin that demonstrates the plugin system.'
        });
    }

    /**
     * Called when plugin is enabled
     * @param {Object} context - { api, player, ui, lyricsManager }
     */
    async onEnable(context) {
        console.log('[HelloWorld] Plugin Enabled');
        
        // Example: Show a notification
        showNotification('Hello World Plugin Enabled! 👋');

        // Example: Add a custom button to the player controls
        this.addButton();
    }

    /**
     * Called when plugin is disabled
     */
    async onDisable(context) {
        console.log('[HelloWorld] Plugin Disabled');
        
        // Cleanup: Remove the button
        this.removeButton();
    }

    addButton() {
        const controls = document.querySelector('.player-controls .buttons');
        if (controls && !document.getElementById('hello-world-btn')) {
            const btn = document.createElement('button');
            btn.id = 'hello-world-btn';
            btn.innerHTML = '👋';
            btn.title = 'Say Hello';
            btn.className = 'btn-icon';
            btn.onclick = () => alert('Hello from the plugin!');
            
            // Insert at the beginning
            controls.prepend(btn);
        }
    }

    removeButton() {
        const btn = document.getElementById('hello-world-btn');
        if (btn) btn.remove();
    }
}
