import styled from 'styled-components'

export async function analyzeStock(stockSymbolToAnalyze: string) {
  if (stockSymbolToAnalyze.length == 0) {
    alert("You must put in a ticker symbol before running the analysis")
    return
  }
  const url = "http://127.0.0.1:5000/analyze-stock/" + stockSymbolToAnalyze

  const response = await fetch(url)
  if (!response.ok) {
    alert("There was a problem getting the analysis for your stock")
  }
  const data = await response.json()
  return data
}

export const PrimaryColor = '#181601'
export const ThemeBrown = '#2b392bff'
export const ThemePurple = '#6843e4ff'
export const ThemeGreen = '#b66d18ff'

export const VerticalAlignContainer = styled.div`
  width: 100%;
  height: 100%;
  display: table;
  color: white;
`

export const VerticalAlignContent = styled.div`
  display: table-cell;
  vertical-align: middle;
`

export const DashboardGridContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border: solid red 1px;
`

export const DashboardGridContent = styled.div`
  background-color: wheat;
  border-radius: 5px;
  padding: 15px
`
export const MarginSpace = styled.div`
  margin-bottom: 15px;
`

export const DashboardTitle = styled.div`
  color: wheat;
  font-size: 25px;
  text-align: center;
`

export const DashboardSubTitle = styled.div`
  color: wheat;
  font-size: 17px;
  text-align: center;
`
export const LoadingOvalContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`

export const BackButton = styled.div`
  margin-left: 10px;
  width: fit-content;
  color: white;
  font-size: 12px;
  &:hover {
  cursor: pointer;
  font-weight: bold;
  }
`

export const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
`

export const AnalyzeInput = styled.div`
  color: white;
  padding: 10px;
  background: none;
  border: none;
  border-bottom: solid white 1px;
`

export const AnalyzeButton = styled.div`
  color: white;
  margin-left: 15px;
  background: none;
  padding: 10px;
  border: solid white 1px;
  &:hover {
  cursor: pointer;
  background-color: white;
  color: ${PrimaryColor}
  }
`