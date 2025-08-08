// ==UserScript==
// @name         Anti-misclick Toggle UI
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Anti-misclick switch using inline SVG icons, no external CDNs. State saved in localStorage.
// @author       @VolodymyrSkarb
// @match        https://pocketoption.com/uk/cabinet/demo-quick-high-low*
// @match        https://pocketoption.com/uk/cabinet/quick-high-low*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'antiMisclickEnabled';
  let antiMisclick = localStorage.getItem(STORAGE_KEY) === 'true';

  const styles = `
      #antiBtnContainer {
        position: fixed;
        bottom: 150px;
        right: 20px;
        z-index: 9999;
      }

      #antiBtn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        background-color: #334155;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      #antiBtn.active {
        background-color: #16a34a;
      }

      #tooltip {
        position: absolute;
        top: -30px;
        right: 0;
        background-color: #16a34a;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: bold;
        font-size: 10px;
        display: none;
        width: 105px;
      }

      #tooltip.show {
        display: block;
      }

      .anti-icon {
        width: 20px;
        height: 20px;
        fill: none;
        stroke: white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `;

  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  const container = document.createElement('div');
  container.id = 'antiBtnContainer';
  container.innerHTML = `
      <div style="position: relative;">
        <button id="antiBtn">${getSVGIcon(antiMisclick)}</button>
        <div id="tooltip">Anti Missclick ON</div>
      </div>
    `;

  function getSVGIcon(enabled) {
    if (enabled) {
      return `
              <svg class="anti-icon" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>`;
    } else {
      return `
          <svg class="anti-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>`;
    }
  }

  window.addEventListener('load', () => {
    document.body.appendChild(container);

    const button = document.getElementById('antiBtn');
    const tooltip = document.getElementById('tooltip');

    const ctrlClickHandler = (e) => {
      if (!e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        alert('Утримуйте Ctrl при натисканні на кнопку');
      }
    };

    const toggleButtonListeners = () => {
      const callAction = document.querySelector('.button-call-wrap');
      const putAction = document.querySelector('.button-put-wrap');

      if (!callAction || !putAction) return;

      if (antiMisclick) {
        callAction.addEventListener('click', ctrlClickHandler);
        putAction.addEventListener('click', ctrlClickHandler);
      } else {
        callAction.removeEventListener('click', ctrlClickHandler);
        putAction.removeEventListener('click', ctrlClickHandler);
      }
    };

    const updateActionTexts = () => {
      const actionItems = document.querySelectorAll('.switch-state-block__item');
      const labelText = document.createElement('span');
      labelText.textContent = '+CTRL';
      labelText.className = 'antiMisclickText';
      labelText.style.cssText = 'margin-left: 1px; font-weight: bold; color: white;';
      labelText.id = 'antiMisclickText';

      actionItems.forEach(wrapper => {
        const icon = wrapper.querySelector('.svg-icon-wrap');

        if (antiMisclick && !wrapper.querySelector('#antiMisclickText')) {
          icon && (icon.style.margin = '0 3px');
          wrapper.appendChild(labelText.cloneNode(true));
        }

        if (!antiMisclick) {
          const existing = wrapper.querySelector('#antiMisclickText');
          if (existing) {
            icon && (icon.style.margin = '');
            existing.remove();
          }
        }
      });
    };

    const updateUI = () => {
      button.innerHTML = getSVGIcon(antiMisclick);
      button.classList.toggle('active', antiMisclick);
      tooltip.classList.toggle('show', antiMisclick);

      toggleButtonListeners();
      updateActionTexts();
    };

    updateUI();

    button.addEventListener('click', () => {
      antiMisclick = !antiMisclick;
      localStorage.setItem(STORAGE_KEY, antiMisclick);
      updateUI();
    });
  });
})();
