import { ArrowLeftIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useToggle, useWindowSize } from 'react-use'
import Button from './components/Button'
import FileSelect from './components/FileSelect'
import useInputImage from './hooks/useInputImage'
import ShortcutsModal from './components/ShortcutsModal'
import Editor from './Editor'

// Keeping GUI Window Open
async function getRequest(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  })
  return response.json()
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  document.addEventListener('DOMContentLoaded', function () {
    const url = document.location
    const route = '/flaskwebgui-keep-server-alive'
    const intervalRequest = 3 * 1000
    function keepAliveServer() {
      getRequest(url + route).then(data => console.log(data))
    }
    setInterval(keepAliveServer, intervalRequest)
  })
}

function App() {
  const [file, setFile] = useState<File>()
  const [showShortcuts, toggleShowShortcuts] = useToggle(false)
  const windowSize = useWindowSize()
  const userInputImage = useInputImage()

  useEffect(() => {
    setFile(userInputImage)
  }, [userInputImage])

  return (
    <div className="h-full full-visible-h-safari flex flex-col">
      <header className="absolute z-10 flex w-full p-1 justify-center sm:justify-between items-center sm:items-start  bg-white backdrop-blur backdrop-filter bg-opacity-30">
        {file ? (
          <Button
            icon={<ArrowLeftIcon className="w-6 h-6" />}
            onClick={() => {
              setFile(undefined)
            }}
          >
            {windowSize.width > 640 ? 'Start new' : undefined}
          </Button>
        ) : (
          <></>
        )}

        {file ? (
          <Button
            onClick={toggleShowShortcuts}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="28"
                height="28"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="none"
                />
                <g fill="currentColor">
                  <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                  <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z" />
                </g>
              </svg>
            }
          />
        ) : (
          <></>
        )}
      </header>

      {showShortcuts && <ShortcutsModal onClose={toggleShowShortcuts} />}

      <main
        className={[
          'h-full flex flex-1 flex-col sm:items-center sm:justify-center overflow-hidden',
          'items-center justify-center',
        ].join(' ')}
      >
        {file ? (
          <Editor file={file} />
        ) : (
          <>
            <div
              className={[
                'flex flex-col sm:flex-row items-center',
                'space-y-5 sm:space-y-0 sm:space-x-6 p-5 pt-0 pb-10',
              ].join(' ')}
            >
              <div className="max-w-xl flex flex-col items-center sm:items-start p-0 m-0 space-y-5">
                <h1 className="text-center sm:text-left text-xl sm:text-3xl">
                  Image inpainting powered by 🦙
                  <u>
                    <a href="https://github.com/saic-mdal/lama">LaMa</a>
                  </u>
                </h1>
              </div>
            </div>

            <div
              className="h-20 sm:h-52 px-4 w-full"
              style={{ maxWidth: '800px' }}
            >
              <FileSelect
                onSelection={async f => {
                  setFile(f)
                }}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
