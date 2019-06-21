import axios from 'axios'

const services = [
  {
    code: 'youtube',
    title: 'Youtube',
    description: 'Video hosting',
    icon: 'https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png',
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      key: 'AIzaSyDWPchLoCEtJrKuoLrrBPJV9esUcNzRvdk',
      channelId: 'UCE5yTn9ljzSnC_oMp9Jnckg',
      part: 'snippet,id',
      order: 'date',
      maxResults: '20'
    },
    parser: (res) => {
      let result = [];
      res.data.items.forEach(el => {
        let link = "";
        if (el.id.videoId) {
          link = "https://www.youtube.com/watch?v=" + el.id.videoId;
        }
        if (el.id.playlistId) {
          link = "https://www.youtube.com/playlist?list=" + el.id.playlistId;
        }
        if (el.id.channelId) {
          link = "https://www.youtube.com/channel/" + el.id.channelId;
        }
        result.push({
          img: el.snippet.thumbnails.default.url,
          title: el.snippet.title,
          description: el.snippet.description,
          link: link,
        })
      });
      return result
    }
  },
  {
    code: 'newsapi',
    title: 'News API',
    description: 'News portal',
    icon: 'https://newsapi.org/favicon-32x32.png',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: 'huawei',
      from: '2019-05-20',
      sortBy: 'publishedAt',
      apiKey: '96b616aaf8b640d6a13a31755f2a65a7'
    },
    parser: (res) => {
      let result = [];
      res.data.articles.forEach(el => {
        result.push({
          img: el.urlToImage,
          title: el.title,
          description: el.description,
          link: el.url,
        })
      });
      return result
    }
  },
  {
    code: 'freshpixl',
    title: 'Creative Agency',
    description: 'Mobile phones',
    icon: 'https://freshpixl.com/wp-content/uploads/2016/03/favicon1.png',
    url: 'https://fonoapi.freshpixl.com/v1/getlatest',
    params: {
      token: 'da6c0500e10c989e637ce0e8d8cdd74a0c3d8c7a116fce76',
      limit: '20'
    },
    parser: (res) => {
      let result = [];
      res.data.forEach(el => {
        result.push({
          title: el.DeviceName,
          description: el.dimensions,
        })
      });
      return result
    }
  },
  {
    code: 'picsum',
    title: 'Lorem Picsum',
    description: 'Random images',
    icon: 'https://picsum.photos/assets/images/favicon/favicon-32x32.png',
    url: 'https://picsum.photos/v2/list',
    params: {
      limit: '10'
    },
    parser: (res) => {
      let result = [];
      res.data.forEach(el => {
        result.push({
          img: el.download_url,
          title: el.author,
          description: "Download_url"+el.download_url,
          link: el.url,
        })
      });
      return result
    }
  },
  {
    code: 'spacex',
    title: 'Space X',
    description: 'Space X missions',
    icon: 'https://www.spacex.com/sites/all/themes/spacex2012/favicon.ico',
    url: 'https://api.spacexdata.com/v3/missions',
    params: {},
    parser: (res) => {
      let result = [];
      res.data.forEach(el => {
        result.push({
          title: el.mission_name,
          description: el.description,
          link: el.wikipedia,
        })
      });
      return result
    }
  },
  {
    code: 'citybik',
    title: 'citybik',
    description: 'Sity bik',
    icon: 'https://citybik.es/favicon.ico',
    url: 'http://api.citybik.es/v2/networks',
    params: {},
    parser: (res) => {
      let result = [];
      res.data.networks.forEach(el => {
        result.push({
          title: el.company && el.company[0],
          description: el.location.city,
        })
      });
      return result
    }
  },
  {
    code: 'tvmaze',
    title: 'TV maze',
    description: 'TV Channel',
    icon: 'http://static.tvmaze.com/images/favico/favicon.ico',
    url: 'http://api.tvmaze.com/search/shows',
    params: {
      q: 'girls'
    },
    parser: (res) => {
      let result = [];
      res.data.forEach(el => {
        result.push({
          img: el.show.image && el.show.image.medium,
          title: el.show.name,
          description: el.show.summary,
          link: el.show.url,
        })
      });
      return result
    }
  },
];

export class Services {

  static description(apiCode) {
    let service = services.find(service => (service.code === apiCode));
    return service && {
      code: service.code,
      title: service.title,
      description: service.description,
      icon: service.icon,
      url: service.url,
    };
  }

  static getRandomServicesCodes() {
    let servicesCodes = services.map(item => item.code);
    let n = 1 + Math.round(Math.random() * 5);
    let shuffled = servicesCodes.sort(function () {
      return .5 - Math.random()
    });

    return shuffled.slice(0, n);
  }

  static getRandom() {
    let service = services.find(service => (service.code === apiCode));
    return {
      title: service.title,
      icon: service.icon,
    };
  }

  static async list({code}) {
    let service = services.find(service => (service.code === code));
    return await axios.get(service.url, {params: service.params}).then((res) => {
      return service.parser(res);
    });
  }
}

export default {}


