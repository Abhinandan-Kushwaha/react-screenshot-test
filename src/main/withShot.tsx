import React, { ReactElement, useRef, useState } from 'react'
import { Metadata, addScreenShotToPath, generateHtmlFile } from './utils'
import { Loader, ModalBody } from './modalBody'
import * as htmlToImage from 'html-to-image'
// import html2canvas from 'html2canvas';

// const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
// const isAndroid = Platform.OS === 'android';

const screenHeight = window.innerHeight,
  screenWidth = window.innerWidth

const relativePathToScreenshotTestServer = '../../../' // since the server code will be in server.js present inside node_modules/screenshot-test-server/dist folder

export const defaultConfig = {
  path: 'ss-test',
  localhostUrl: 'http://127.0.0.1',
  port: '8080',
  batchSize: 10,
  maxWidth: 500,
  backgroundColor: 'transparent',
  showDiffInGrayScale: false,
  quality: 0.9
}

export interface ScreenshotConfig {
  path?: string
  localhostUrl?: string
  port?: string
  batchSize?: number
  maxWidth?: number
  backgroundColor?: string
  showDiffInGrayScale?: boolean
  quality?: number
}

export interface Components {
  component: (props?: any) => ReactElement
  title: string
  id: string
  description?: string
  showDiffInGrayScale?: boolean
  maxWidth?: number
  backgroundColor?: string
  quality?: number
}

export const useScreenShotTest = (
  components: Components[],
  screenshotConfig?: ScreenshotConfig
) => {
  const {
    localhostUrl = defaultConfig.localhostUrl,
    port = defaultConfig.port,
    batchSize = defaultConfig.batchSize,
    maxWidth = defaultConfig.maxWidth,
    backgroundColor = defaultConfig.backgroundColor,
    showDiffInGrayScale,
    quality = defaultConfig.quality
  } = screenshotConfig ?? {}

  let path = screenshotConfig?.path ?? defaultConfig.path

  if (path.startsWith('/') || path.startsWith('./')) {
    path = path.split('/')[1]
  }

  path = relativePathToScreenshotTestServer + path
  const offset = useRef(0)

  const [componentsCurrentlyRendered, setComponentsCurrentlyRendered] =
    useState<Components[]>(components.slice(offset.current, batchSize))

  const viewShotRefs:any[] = components.map((_) => useRef(null))
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState<Function>(() => null)

  const onModalDismiss = () => {
    if (loading) return
    setModalVisible(false)
    setModalTitle('')
    setModalBody(() => null)
  }

  const captureView = (
    viewShotRefs: any,
    componentsCurrentlyRendered: Components[]
  ) => {
    if (viewShotRefs[offset.current].current) {
      setModalVisible(true)
      setLoading(true)
      const ps = componentsCurrentlyRendered.map(async (component, index) => {
        const currentViewshotRef = viewShotRefs[offset.current + index].current
        if (currentViewshotRef) {
          const res = await htmlToImage.toPng(currentViewshotRef) //currentViewshotRef.capture();
          console.log('res...', res)
          const data = res.substring(res.indexOf(',') + 1)
          console.log('data...', data)

          // const dataUrl = canvas.toDataURL()
          // const data = await RNFS.readFile(canvas, 'base64');
          // console.log('data...',data)

          await addScreenShotToPath(
            data,
            component.id,
            path,
            localhostUrl,
            port,
            component.showDiffInGrayScale ??
              showDiffInGrayScale ??
              defaultConfig.showDiffInGrayScale
          )
        }
      })

      const metaData: Metadata = {
        port,
        components: components.map((comp) => {
          const {
            id,
            title,
            description = '',
            maxWidth = 0,
            backgroundColor = ''
          } = comp
          return { id, title, description, maxWidth, backgroundColor }
        })
      }

      Promise.all(ps)
        .then(async () => {
          const res = await generateHtmlFile(
            path,
            metaData,
            localhostUrl,
            port,
            maxWidth,
            backgroundColor
          )
          setLoading(false)
          if (res.status === 'success') {
            const newOffset = offset.current + batchSize
            if (newOffset < components.length) {
              offset.current = newOffset
              const newComponents = components.slice(
                newOffset,
                newOffset + batchSize
              )
              setComponentsCurrentlyRendered(newComponents)
              captureView(viewShotRefs, newComponents)
            } else {
              const splitPath = path.split('/')
              const folder = splitPath[splitPath.length - 1]

              setModalTitle('Screenshot tests generated successfully!')
              setModalBody(() => (
                <div>
                  Open the file
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: '#23569E'
                    }}
                  >{` ${folder}/test.html `}</span>
                  in your browser to see the reports.
                </div>
              ))
            }
          } else {
            setModalTitle('Something went wrong while generating HTML!')
          }
        })
        .catch((err: any) => {
          setLoading(false)
          if (err?.message === 'Network request failed') {
            setModalTitle('Server NOT running!! Please start the test server')
            setModalBody(() => (
              <>
                <div>
                  1. In the
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >{` package.json `}</span>
                  under
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >{` "scripts" `}</span>
                  add-
                </div>
                <div
                  style={{
                    color: '#23569E',
                    marginTop: 4,
                    marginBottom: 4
                  }}
                >
                  {`"ss-test"`}
                  <span style={{ color: 'brown' }}>
                    {` :   "cd ./node_modules/screenshot-test-server/dist && node server.js"`}
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  2. Run the command-
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >
                    {` "npm run ss-test" `}
                  </span>
                </div>
                <div style={{ marginTop: 6 }}>
                  3. Press the "Capture and Compare" button again.
                </div>
              </>
            ))
          } else {
            setModalTitle('Something went wrong!')
          }
        })
    }
  }

  return (
    <div
      style={{
        flex: 1,
        height: screenHeight,
        backgroundColor: '#aaa',
        position: 'relative'
      }}
    >
      <div
        style={{
          borderWidth: 2,
          borderRadius: 4,
          padding: 8,
          margin: 6,
          maxHeight: screenHeight - 85,
          backgroundColor: screenshotConfig?.backgroundColor ?? 'white'
        }}
      >
        <span>{`Rendering items from ${offset.current} to ${
          offset.current + batchSize
        }`}</span>
        <div
          style={{
            height: screenHeight - 145,
            overflow: 'scroll',
            margin: 6,
            padding: 8,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'gray',
            borderRadius: 4
          }}
        >
          {[...componentsCurrentlyRendered].map((comp: any, index: number) => {
            console.log(
              'viewShotRefs[offset.current + index]',
              viewShotRefs[offset.current + index].offsetWidth
            )
            return (
              <div
                key={comp.id}
                ref={viewShotRefs[offset.current + index]}
                style={{ width: 'max-content' }}
                // options={{format: 'png', quality: comp.quality ?? quality}}
              >
                {comp.component()}
              </div>
            )
          })}
        </div>
      </div>
      <div
        onClick={() => captureView(viewShotRefs, componentsCurrentlyRendered)}
        style={{
          borderRadius: 4,
          backgroundColor: '#111',
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 10,
          paddingBottom: 10,
          marginTop: -16,
          marginLeft: (screenWidth - 240) / 2,
          maxWidth: 220,
          alignItems: 'center',
          alignSelf: 'center',
          borderColor: 'lightgray',
          borderWidth: 2,
          borderStyle: 'solid'
        }}
      >
        <div
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
          }}
        >
          Capture and Compare
        </div>
      </div>
      {modalVisible ? (
        <div
          // activeOpacity={1}
          onClick={onModalDismiss}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: screenWidth,
            height: screenHeight,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0
          }}
        >
          {loading ? (
            <Loader offset={offset.current} batchSize={batchSize} />
          ) : (
            <ModalBody
              title={modalTitle}
              body={modalBody}
              onDismiss={onModalDismiss}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}
