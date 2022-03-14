import BrokenCloudsDay from "./broken-clouds-day-weather.jpg";
import BrokenCloudsNight from "./broken-clouds-night-weather.jpg";

import ClearSkyDay from "./clear-sky-day-weather.jpg";
import ClearSkyNight from "./clear-sky-night-weather.jpg";

import FewCloudsDay from "./few-clouds-day-weather.jpg";
import FewCloudsNight from "./few-clouds-night-weather.jpg";

import Rain from "./rain-weather.jpg";
import Thunderstorm from "./thunderstorm-weather.jpg";

import SnowDay from "./snow-day-weather.jpg";
import SnowNight from "./snow-day-weather.jpg";

import Mist from "./mist-day-night-weather.jpg";

import Default from "./the-shire-default.jpg";

interface Backgrounds {
  clear_sky: {
    day: string;
    night: string;
  };
  few_clouds: {
    day: string;
    night: string;
  };
  broken_clouds: {
    day: string;
    night: string;
  };
  rain: {
    day: string;
    night: string;
  };
  thunderstorm: {
    day: string;
    night: string;
  };
  snow: {
    day: string;
    night: string;
  };
  mist: {
    day: string;
    night: string;
  };
  default: string;
}

const BackgroundImages = <Backgrounds>{
  clear_sky: {
    day: ClearSkyDay,
    night: ClearSkyNight,
  },
  few_clouds: {
    day: FewCloudsDay,
    night: FewCloudsNight,
  },
  broken_clouds: {
    day: BrokenCloudsDay,
    night: BrokenCloudsNight,
  },
  rain: {
    day: Rain,
    night: Rain,
  },
  thunderstorm: {
    day: Thunderstorm,
    night: Thunderstorm,
  },
  snow: {
    day: SnowDay,
    night: SnowNight,
  },
  mist: {
    day: Mist,
    night: Mist,
  },
  default: Default,
};

export default BackgroundImages;
