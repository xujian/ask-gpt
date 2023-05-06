import React, { useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'

type WindowStatus = 'maximized' | 'normal'

export default function Titlebar () {
  
  // add a window status state
  const [windowStatus, setWindowStatus] = useState<WindowStatus>('normal')

  return (
    <div className="titlebar">
      <div className="buttons">
        <a className="button close" href="void(0)"
          onClick={() => appWindow.close()}></a>
        <a className="button minimize" href="void(0)"
          onClick={() => appWindow.maximize()}></a>
        <a className={`button ${windowStatus === 'normal' ? 'maximize' : 'restore'}`} href="void(0)"
          onClick={() => {
            if (windowStatus === 'normal') {
              appWindow.maximize()
              setWindowStatus('maximized')
            } else {
              appWindow.toggleMaximize()
              setWindowStatus('normal')
            }
          }}></a>
      </div>
  </div>
  )
}