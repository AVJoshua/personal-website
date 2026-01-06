import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { PrimaryColor, VerticalAlignContainer, VerticalAlignContent } from './stockAnalysisDashboard'
import NumberStat from './numberStat'
import { ThemeGreen, ThemeBrown, ThemePurple } from './stockAnalysisDashboard'

// Register the necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend)

// Outer container for chart + text
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
`;


const ChartWrapper = styled.div`
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: left;
`;



interface NewsSentimentAnalysisProps {
  newsTextAnalysis: any;
}


const NewsSentimentAnalysis: React.FC<NewsSentimentAnalysisProps> = ({newsTextAnalysis}) => {
  
  const sentiment = newsTextAnalysis.data.sentiment
  const data = {
    labels: ['Positive', 'Negative', 'Nuetral'],
    datasets: [
      {
        label: 'Sentiment',
        data: [sentiment.pos, sentiment.neg, sentiment.neu],
        backgroundColor: [ThemeBrown, ThemeGreen, ThemePurple],
      },
    ],
  };

  // Options for customizing the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Doughnut data={data} options={options} />
      </ChartWrapper>
      {/* Text section */}
      <VerticalAlignContainer>
        <VerticalAlignContent>
          <div style={{height: '40px', color: PrimaryColor}}>News Text Analysis</div>
          <div style={{height: '40px'}}>
            <NumberStat
              value={newsTextAnalysis.metadata.sentencesAnalyzed}
              label='Sentences Analyzed'
            ></NumberStat>
          </div>
          <div style={{height: '40px'}}>
            <NumberStat
              value={newsTextAnalysis.metadata.wordsAnalyzed}
              label='Words Analyzed'
            ></NumberStat>
          </div>
        </VerticalAlignContent>
      </VerticalAlignContainer>
    </ChartContainer>
  );
};

export default NewsSentimentAnalysis;