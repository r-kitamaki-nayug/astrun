let globalId = 0;

export class Data {
  id: number;
  type: string;
  data: { [key: string]: unknown };

  constructor(type: string, data: { [key: string]: unknown }) {
    this.id = ++globalId;
    this.type = type;
    this.data = data;
  }
}

export const Type = {
  /**
   * ゲームから呼び出すプラットフォーム機能
   */
  Feature: "feature",

  /**
   * プラットフォームからゲームへ送られるイベント
   */
  Event: "event",
};

export const EventType = {
  State: {
    Ready: "state-ready",
    NotReady: "state-not-ready",
  },

  Account: {
    Get: "account-get",
  },

  Ranking: {
    GetList: "ranking-get-list",
    GetMy: "ranking-get-my",
    Post: "ranking-post",
  },
};

export const FeatureType = {
  Account: {
    Get: "account-get",
    SignIn: "account-sign-in",
  },

  Ranking: {
    GetList: "ranking-get-list",
    GetMy: "ranking-get-my",
    Post: "ranking-post",
  },
};

// --------------------------------------------
// プラットフォームからゲームへ送るデータ
// --------------------------------------------
export interface EventTypeCommon {
  result: boolean;
  message: string;
}

export interface EventTypeAccountGet extends EventTypeCommon {
  uid: string;
  display_name: string;
}

export interface EventTypeRankingItem {
  uid: string;
  order: number;
  score: number;
  display_name: string;
}

export interface EventTypeRankingGetList extends EventTypeCommon {
  list: EventTypeRankingItem[];
}

export type EventTypeRankingPost = EventTypeCommon;

export const eventStateReady = () => {
  return new Data(Type.Event, {
    command: EventType.State.Ready,
  });
};

export const eventStateNotReady = () => {
  return new Data(Type.Event, {
    command: EventType.State.NotReady,
  });
};

export const eventAccountGet = (value: EventTypeAccountGet) => {
  return new Data(Type.Event, {
    command: EventType.Account.Get,
    value: value,
  });
};

export const eventRankingGetList = (value: EventTypeRankingGetList) => {
  return new Data(Type.Event, {
    command: EventType.Ranking.GetList,
    value: value,
  });
};

export const eventRankingGetMy = (value: EventTypeRankingGetList) => {
  return new Data(Type.Event, {
    command: EventType.Ranking.GetMy,
    value: value,
  });
};

export const eventRankingPost = (value: EventTypeRankingPost) => {
  return new Data(Type.Event, {
    command: EventType.Ranking.Post,
    value: value,
  });
};

// --------------------------------------------
// ゲームからプラットフォームへ送るデータ
// --------------------------------------------
export type FeatureTypeRankingGetList = {
  category: string;
  limit: number;
  offset: number;
};

export type FeatureTypeRankingPost = {
  score: number;
};

export const featureAccountGet = () => {
  return new Data(Type.Feature, { command: FeatureType.Account.Get });
};

export const featureAccountSignIn = () => {
  return new Data(Type.Feature, { command: FeatureType.Account.SignIn });
};

export const featureRankingGetList = (value: FeatureTypeRankingGetList) => {
  return new Data(Type.Feature, {
    command: FeatureType.Ranking.GetList,
    value: value,
  });
};

export const featureRankingGetMy = () => {
  return new Data(Type.Feature, { command: FeatureType.Ranking.GetMy });
};

export const featureRankingPost = (value: FeatureTypeRankingPost) => {
  return new Data(Type.Feature, {
    command: FeatureType.Ranking.Post,
    value: value,
  });
};
