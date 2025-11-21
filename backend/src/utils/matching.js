function scoreTutor(tutor, request) {
  let score = 0;
  if ((tutor.subjects || []).includes(request.subject)) score += 30;
  if ((tutor.grades || []).includes(request.grade)) score += 20;

  const availMatch = (tutor.availability || []).some(a => (a.slots || []).some(s => (request.availabilitySlots || []).includes(s)));
  if (availMatch) score += 15;

  if ((tutor.badges || []).includes('Exceeding Expectations')) score += 25;
  else if ((tutor.badges || []).includes('Meeting Expectations')) score += 10;
  else if ((tutor.badges || []).includes('Approaching Expectations')) score += 5;

  if ((tutor.specialties || []).includes(request.learningGoals)) score += 10;

  score += (tutor.successfulSessions || 0) * 0.5;

  return score;
}

function matchTutors(tutors, request, top = 3) {
  const scored = tutors.map(t => ({ tutor: t, score: scoreTutor(t, request) }));
  scored.sort((a,b) => b.score - a.score);
  return scored.slice(0, top).map(s => s.tutor);
}

module.exports = { matchTutors };