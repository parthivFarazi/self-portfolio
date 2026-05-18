import athleticStadium from '../../../images/athletic/bobbyDodd.jpg';
import athleticPipeline from '../../../images/athletic/excelPythonPipeline.png';
import athleticChart from '../../../images/athletic/programmeValuation.png';
import pongGameLog from '../../../images/pongBaseball/gameLog.jpeg';
import pongLineupCard from '../../../images/pongBaseball/lineupCard.png';
import pongLiveScore from '../../../images/pongBaseball/liveScore.png';
import qardInteraction from '../../../images/qard/cardInteraction.png';
import qardLandingPage from '../../../images/qard/landingPage.png';
import qardHero from '../../../images/qard/qardFinal.jpg';
import robotCircuitDiagram from '../../../images/robot/circuitDiagram.png';
import robotFrontView from '../../../images/robot/frontView.png';
import robotAction from '../../../images/robot/robotInAction.png';
import robotSideView from '../../../images/robot/sideview.png';
import sootheEveningCheckIn from '../../../images/sootheZenGarden/eveningCheckIn.png';
import sootheMoodArc from '../../../images/sootheZenGarden/moodArc.png';
import sootheMorningCheckIn from '../../../images/sootheZenGarden/morningCheckIn.png';
import updtPlayerSearch from '../../../images/updt/playerSearch.png';
import updtPlayerTracking from '../../../images/updt/playerTracking.png';
import updtTacticalPattern from '../../../images/updt/tacticalPattern.png';

export const panelImages = {
  athletic: {
    chart: athleticChart,
    pipeline: athleticPipeline,
    stadium: athleticStadium,
  },
  pong: {
    gameLog: pongGameLog,
    lineupCard: pongLineupCard,
    liveScore: pongLiveScore,
  },
  qard: {
    detailInteraction: qardInteraction,
    detailLandingPage: qardLandingPage,
    hero: qardHero,
  },
  robot: {
    action: robotAction,
    circuitDiagram: robotCircuitDiagram,
    frontView: robotFrontView,
    sideView: robotSideView,
  },
  soothe: {
    eveningCheckIn: sootheEveningCheckIn,
    moodArc: sootheMoodArc,
    morningCheckIn: sootheMorningCheckIn,
  },
  updt: {
    playerSearch: updtPlayerSearch,
    playerTracking: updtPlayerTracking,
    tacticalPattern: updtTacticalPattern,
  },
} as const;
