import athleticStadium from '../../../images-webp/athletic/bobbyDodd.webp';
import athleticPipeline from '../../../images-webp/athletic/excelPythonPipeline.webp';
import athleticChart from '../../../images-webp/athletic/programmeValuation.webp';
import pongGameLog from '../../../images-webp/pongBaseball/gameLog.webp';
import pongLineupCard from '../../../images-webp/pongBaseball/lineupCard.webp';
import pongLiveScore from '../../../images-webp/pongBaseball/liveScore.webp';
import qardInteraction from '../../../images-webp/qard/cardInteraction.webp';
import qardLandingPage from '../../../images-webp/qard/landingPage.webp';
import qardHero from '../../../images-webp/qard/qardFinal.webp';
import robotCircuitDiagram from '../../../images-webp/robot/circuitDiagram.webp';
import robotFrontView from '../../../images-webp/robot/frontView.webp';
import robotAction from '../../../images-webp/robot/robotInAction.webp';
import robotSideView from '../../../images-webp/robot/sideview.webp';
import sootheEveningCheckIn from '../../../images-webp/sootheZenGarden/eveningCheckIn.webp';
import sootheMoodArc from '../../../images-webp/sootheZenGarden/moodArc.webp';
import sootheMorningCheckIn from '../../../images-webp/sootheZenGarden/morningCheckIn.webp';
import updtPlayerSearch from '../../../images-webp/updt/playerSearch.webp';
import updtPlayerTracking from '../../../images-webp/updt/playerTracking.webp';
import updtTacticalPattern from '../../../images-webp/updt/tacticalPattern.webp';
import updtCreateX from '../../../images/updt/createX.png';

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
    createX: updtCreateX,
  },
} as const;
