import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import d3Tip from 'd3-tip'

import { select, line, area, scaleLinear, axisBottom, brushX } from 'd3'

const Chart = () => {
  const svgRef = useRef()
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth)

  const dropDownInputValues = [70, 44, 55, 66, 20, 100]

  const handleResize = () => {
    setWindowsWidth(window.innerWidth)
  }

  useEffect(() => {
    const svg = select(svgRef.current)

    const xScale = scaleLinear()
      .domain([0, dropDownInputValues.length - 1])
      .range([70, (windowsWidth / 100) * 44])

    const yScale = scaleLinear()
      .domain([0, 120])
      .range([(windowsWidth / 100) * 16, -40])

    const myLine = line()
      .x((val, ind) => xScale(ind))
      .y((val) => yScale(val))

    svg
      .selectAll('.line')
      .data([dropDownInputValues])
      .join('path')
      .attr('class', 'line')
      .attr('d', (val) => myLine(val))
      .attr('fill', 'none')
      .attr('stroke', '#7B879A')
      .attr('stroke-width', '4px')

    svg
      .selectAll('.text')
      .data(dropDownInputValues)
      .join('text')
      .attr('class', 'text')
      .attr('font-size', '18')
      .style('font-weight', 'bold')
      .style('color', '#475365')
      .attr('transform', 'translate(-15,-15)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', yScale)
      .text((value) => `${value}%`)

    svg
      .selectAll('.circleBottom')
      .data(dropDownInputValues)
      .join('circle')
      .attr('class', 'circleBottom')
      .attr('r', '16')
      .attr('cx', (val, ind) => xScale(ind))
      .attr('cy', (val) => (windowsWidth / 100) * 16)
      .attr('fill', '#475365')
      .attr('stroke-width', '5')

    svg
      .selectAll('.textBottom')
      .data(dropDownInputValues)
      .join('text')
      .attr('class', 'textBottom')
      .attr('font-size', '18')
      .style('font-weight', 'bold')
      .style('fill', '#fff')
      .style('z-index', '3')
      .attr('transform', 'translate(-5,5)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', (val) => (windowsWidth / 100) * 16.05)
      .text((value, index) => index + 1)
      .style('font-family', 'Helvetica')

    svg
      .selectAll('.textEntry')
      .data([1])
      .join('text')
      .attr('class', 'textEntry')
      .attr('font-size', '18')
      .style('font-weight', 'bold')
      .style('fill', '#475365')
      .style('transform', 'translateY(10px)')
      .attr('y', (val) => (windowsWidth / 100) * 15.8)
      .attr('x', '0')
      .text('Entry')

    svg
      .selectAll('.textExit')
      .data([1])
      .join('text')
      .attr('class', 'textExit')
      .attr('font-size', '18')
      .style('font-weight', 'bold')
      .style('fill', '#475365')
      .style('transform', 'translateY(10px)')
      .attr('y', (val) => (windowsWidth / 100) * 15.8)
      .attr('x', (val) => (windowsWidth / 100) * 45.5)
      .text('Exit')

    const xAxis = axisBottom(xScale)
      .ticks(dropDownInputValues.length - 1)
      .tickSize((windowsWidth / 100) * 16)
      .tickFormat('')
    svg
      .select('.x-axis')
      .style('transform', 'translateY(-280)')
      .call(xAxis)
      .select('.domain')
      .remove()

    const myArea = area()
      .x((value, index) => xScale(index))
      .y0(250)
      .y1((value) => yScale(value))

    svg
      .selectAll('.area')
      .data([dropDownInputValues])
      .join('path')
      .attr('class', 'area')
      .attr('d', (value) => myArea(value))
      .attr('stroke-width', 1.5)

    svg
      .selectAll('.circle')
      .data(dropDownInputValues)
      .join('circle')
      .attr('class', 'circle')
      .attr('r', '9px')
      .attr('cx', (val, ind) => xScale(ind))
      .attr('cy', (val) => yScale(val))
      .attr('fill', 'red')
      .attr('stroke', '#fff')
      .attr('stroke-width', '4')

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [dropDownInputValues])

  if (dropDownInputValues.length < 2) {
    return (
      <StyledChart>
        Select a minimum of 2 URLs / Segments to populate graph
      </StyledChart>
    )
  }

  return (
    <StyledChart>
      <Svg ref={svgRef}>
        <g className='x-axis' />
      </Svg>
    </StyledChart>
  )
}

export default Chart

const StyledChart = styled.div`
  grid-column: col-start 5 / -1;
  grid-row: 3 / 4;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 22vw;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 4px;
  color: #a2a2a2;
  font-size: 1.25rem;
  padding-top: 30px;
`
const Svg = styled.svg`
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow: visible;
`
