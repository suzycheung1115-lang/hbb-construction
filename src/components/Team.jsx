import NextLink from './NextLink';
import { teamRows } from '../data';

/**
 * Team component - displays team members organized in rows,
 * with text-only cards that link to individual team member pages.
 * Each row can have any number of members.
 *
 * @returns JSX.Element
 */
const Team = () => {
  // Calculate column class based on number of members in row
  // For 1 member: col-12, for 2: col-md-6, for 3: col-md-4, for 4+: col-md-3
  const getColumnClass = (memberCount) => {
    if (memberCount === 1) return 'col-12';
    if (memberCount === 2) return 'col-md-6';
    if (memberCount === 3) return 'col-md-4';
    return 'col-md-3'; // 4 or more members
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="d-inline-flex align-items-center mb-3">
          <i className="uil uil-users-alt fs-40 text-primary me-2" />
          <h1 className="mb-0 oswald">
            Our <span className="text-primary">Team</span>
          </h1>
        </div>
      </div>

      {/* Team Members Rows */}
      {teamRows.map((row, rowIndex) => {
        const columnClass = getColumnClass(row.length);

        return (
          <div key={rowIndex} className="row g-4 justify-content-center mb-4">
            {row.map((member) => {
              const cardContent = (
                <div className={`card border-0 shadow-sm h-100 text-center ${member.disableLink ? 'team-card-no-link' : 'team-card'}`}>
                  <div className="card-body p-4 d-flex flex-column">
                    {/* Initials/Avatar Circle */}
                    <div className="team-initials-circle mx-auto mb-3">
                      <span className="team-initials-text">{getInitials(member.name)}</span>
                    </div>
                    
                    {/* Name */}
                    <h3 className="card-title fs-22 fw-bold oswald mb-2">{member.name}</h3>
                    
                    {/* Title */}
                    <p className="card-text text-muted roboto mb-3">{member.title}</p>
                    
                    {/* Experience if available */}
                    {member.experience && (
                      <p className="card-text text-muted roboto small mb-2">
                        <i className="uil uil-clock me-1" />
                        {member.experience}
                      </p>
                    )}
                    
                    {/* Email if available */}
                    {member.email && (
                      <p className="card-text text-muted roboto small mb-0">
                        <i className="uil uil-envelope me-1" />
                        {member.email}
                      </p>
                    )}
                  </div>
                </div>
              );

              return (
                <div key={member.id} className={columnClass}>
                  {member.disableLink || !member.slug ? (
                    cardContent
                  ) : (
                    <NextLink 
                      href={`/team/${member.slug}`}
                      title={cardContent}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Team;

