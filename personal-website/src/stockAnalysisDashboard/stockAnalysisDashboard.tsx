import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { analyzeStock,
  VerticalAlignContainer,
  VerticalAlignContent,
  DashboardGridContainer,
  MarginSpace,
  DashboardTitle,
  DashboardSubTitle,
  BackButton,
  LoadingOvalContainer,
  InputContainer,
  // AnalyzeInput,
  AnalyzeButton
} from './stockAnalysisDashboard'
import './stockAnalysisDashboard.css'
import DashboardGrid from './dashboardGrid'

function stockAnalysisDashboard() {
  const [stockData, setStockData] = useState<any>()
  const [stockSymbol, setStockSymbol] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [gotData, setGotData] = useState(false)

  function goBack () {
    setGotData(false)
    setIsLoading(false)
  }



  async function runStockAnalysis () {
    setIsLoading(true)
    const gotStockData = await analyzeStock(stockSymbol)
    if (gotStockData) {
      setStockData(gotStockData)
      setGotData(true)
      setIsLoading(false)
    } else {
      goBack()
    }
  }

  if (gotData && stockData) {
    return (
      <VerticalAlignContainer>
        <VerticalAlignContent>
          <DashboardGridContainer>
            <DashboardTitle>
              {stockData.basicInfo.longName}
            </DashboardTitle>
            <DashboardSubTitle>
              {stockData.basicInfo.sector}
            </DashboardSubTitle>
            <MarginSpace></MarginSpace>
            <BackButton onClick={() => goBack()}>Back</BackButton>
            <div>
              <DashboardGrid
                stockData={stockData}
              ></DashboardGrid>
            </div>
          </DashboardGridContainer>
        </VerticalAlignContent>
      </VerticalAlignContainer>
    )
  }

  return (
    <VerticalAlignContainer>
      <VerticalAlignContent>
        <div>
          <DashboardTitle id="stock-analysis-dashboard-title">STOCK ANALYSIS DASHBOARD</DashboardTitle>
          {isLoading ? (
            <LoadingOvalContainer>
              <MarginSpace></MarginSpace>
              <Oval
                visible={true}
                height="80"
                width="80"
                color="white"
                secondaryColor='white'
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </LoadingOvalContainer>
          ) : (
            <div>
              <DashboardSubTitle id="stock-analysis-dashboard-subtitle">
                Put in a stock symbol you'd like to analyze (e.g. MSFT)
              </DashboardSubTitle>
              <MarginSpace></MarginSpace>
              <InputContainer>
                <input
                  className="AnalyzeInput"
                  value={stockSymbol}
                  onChange={e => setStockSymbol(e.target.value)}
                />
                <AnalyzeButton className="stock-analysis-dashboard-button" onClick={() => runStockAnalysis()}>Analyze</AnalyzeButton>
              </InputContainer>
            </div>
          )}
        </div>
      </VerticalAlignContent>
    </VerticalAlignContainer>
  )
}

export default stockAnalysisDashboard
