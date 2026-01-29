import React from 'react';
import { processSteps } from '../data';

/**
 * Process component - displays workflow steps as flip cards
 * Cards flip on hover to show more details
 * Cards are connected to form a snake/zigzag workflow visualization
 * Flow: left to right (row 1), down, right to left (row 2), down, left to right (row 3), etc.
 * 
 * @returns JSX.Element
 */
const Process = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="d-inline-flex align-items-center mb-3">
          <i className="uil uil-processor fs-40 text-primary me-2" />
          <h1 className="mb-0 oswald">
            Our <span className="text-primary">Process</span>
          </h1>
        </div>
        {processSteps.description && (
          <p className="lead roboto text-muted mt-4">{processSteps.description}</p>
        )}
      </div>

      {/* Process Steps Grid */}
      <div className="process-workflow">
        {(() => {
          const itemsPerRow = processSteps.itemsPerRow || 4;
          const rows = [];
          
          // Group steps into rows dynamically
          for (let i = 0; i < processSteps.steps.length; i += itemsPerRow) {
            rows.push(processSteps.steps.slice(i, i + itemsPerRow));
          }
          
          return rows.map((row, rowIndex) => {
            const isLastRow = rowIndex === rows.length - 1;
            const isFirstRow = rowIndex === 0;
            // Even rows (0, 2, 4...) go left-to-right, odd rows (1, 3, 5...) go right-to-left
            const isRightToLeft = rowIndex % 2 === 1;
            const orderedRow = isRightToLeft ? [...row].reverse() : row;
            // Calculate offset for reverse rows to align with previous row's last card
            // When row is reversed, we want the last card (in original order) to align with previous row's last card
            const previousRowLength = rowIndex > 0 ? rows[rowIndex - 1].length : 0;
            const currentRowLength = row.length;
            // For reverse rows, if they have fewer items, offset to align connector positions
            const offsetNeeded = isRightToLeft && !isFirstRow && previousRowLength > currentRowLength
              ? (previousRowLength - currentRowLength) * (250 + 48) // card width + connector width
              : 0;
            
            return (
              <div 
                key={rowIndex} 
                className={`process-row ${isRightToLeft ? 'reverse-row' : ''}`}
                style={offsetNeeded > 0 ? { paddingLeft: `${offsetNeeded}px` } : {}}
              >
                {orderedRow.map((step, stepIndex) => {
                  const originalIndex = processSteps.steps.findIndex(s => s.id === step.id);
                  const positionInOrderedRow = stepIndex;
                  const isLastInRow = positionInOrderedRow === orderedRow.length - 1;
                  
                  // Calculate which card should connect down/up
                  // Last card in row (except last row) connects down
                  // For right-to-left rows, "last" in display means the first card in the ordered array
                  // First card in row (except first row) connects up
                  // For right-to-left rows, "first" in display means the last card in the ordered array
                  const isLastInDisplay = isRightToLeft ? positionInOrderedRow === 0 : isLastInRow;
                  const isFirstInDisplay = isRightToLeft ? isLastInRow : positionInOrderedRow === 0;
                  
                  // Only show ONE vertical connector per connection
                  // Show down connector on the last card of each row (except last row)
                  // Do NOT show up connector - only use down connectors to avoid duplicates
                  const shouldConnectDown = !isLastRow && isLastInDisplay;
                  const shouldConnectUp = false; // Disabled to prevent duplicate vertical arrows
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div className={`process-step-wrapper ${shouldConnectDown ? 'has-down-connection' : ''} ${shouldConnectUp ? 'has-up-connection' : ''}`}>
                        {/* Vertical connector from above */}
                        {shouldConnectUp && (
                          <div className="process-vertical-connector-up">
                            <div className="process-connector-down">
                              <i className="uil uil-arrow-down" />
                            </div>
                          </div>
                        )}
                        
                        {/* Process Card */}
                        <div className="process-card-container">
                          <div className="process-card">
                            {/* Front of Card */}
                            <div className="process-card-front">
                              <div className="process-card-number">
                                {step.number || (originalIndex + 1 < 10 ? `0${originalIndex + 1}` : originalIndex + 1)}
                              </div>
                              <h3 className="process-card-title oswald">{step.title}</h3>
                              {step.duration && (
                                <div className="process-card-duration roboto text-muted">
                                  {step.duration}
                                </div>
                              )}
                              {step.icon && (
                                <div className="process-card-icon">
                                  <i className={step.icon} />
                                </div>
                              )}
                            </div>
                            
                            {/* Back of Card */}
                            <div className="process-card-back">
                              <h3 className="process-card-back-title oswald">{step.title}</h3>
                              <p className="process-card-description roboto">{step.description}</p>
                              {step.details && step.details.length > 0 && (
                                <ul className="process-card-details">
                                  {step.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="roboto">{detail}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default Process;
