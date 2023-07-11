/* Response Types */
export type linkData = {
  url: string;
}

export type wasSuccessful = {
  successful: boolean;
}

export type rawPartialGuild = {
  id: string;
  name: string;
  icon: string;
  textIcon: string;
  isOwner: boolean;
  permissions: string;
  invite: string;
}

export type rawPartialGuildsGroup = {
  availableGuilds: rawPartialGuild[];
  optionalGuilds: rawPartialGuild[];
}

export type rawUser = {
  id: string;
  username: string;
  avatar: string;
  banner: string;
  accent_color: number;
}

export type trustedHost = {
  id: string;
  name: string;
  color: string;
  cooldown: number;
  cooldown_type: string;
}

export type lfgRole = {
  id: string;
  name: string;
  color: string
}

export type lfgChannel = {
  id: string;
  name: string;
  roles: lfgRole[];
}

export type guildRole = {
  id: string;
  name: string;
  color: string;
  emoji: string | null;
}

export type permittedChannel = {
  id: string;
  name: string;
  position: number;
}

export type notPermittedChannel = {
  name: string;
  reason: string;
  position: number;
}

export type guildChannels = {
  permitted: permittedChannel[];
  notPermitted: notPermittedChannel[];
}

export type guildSettings = {
  roles: trustedHost[];
  channels: lfgChannel[];
  guild_roles: guildRole[];
  guild_channels: guildChannels;
}

/* Transformed Classes */
export class PartialGuild {
  id: bigint;
  name: string;
  icon: string;
  textIcon: string;
  isOwner: boolean;
  permissions: bigint;
  invite: string;

  constructor(data: rawPartialGuild) {
    this.id = BigInt(data.id);
    this.name = data.name;
    this.icon = data.icon;
    this.textIcon = data.textIcon;
    this.isOwner = data.isOwner;
    this.permissions = BigInt(data.permissions);
    this.invite = data.invite;
  }

  static createEmpty(): PartialGuild {
    return new PartialGuild(
      {id: '0', name: "", icon: "", textIcon: "None", isOwner: false, permissions: '0', invite: ''}
    );
  }

  sizedIcon(res: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 = 64): string {
    if (this.icon === '/assets/empty.png') {
      return this.icon;
    }
    return this.icon + '?size=' + res;
  }
}

export class User {
  id: bigint;
  name: string;
  avatar: string;
  banner: string;
  accent_color: number;

  constructor(data: rawUser) {
    this.id = BigInt(data.id);
    this.name = data.username;
    this.avatar = data.avatar;
    this.banner = data.banner;
    this.accent_color = data.accent_color;
  }

  static createEmpty(): User {
    return new User(
      {id: '0', username: "", avatar: "", banner: "", accent_color: 0}
    );
  }

  sizedAvatar(res: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 = 64): string { /* discord avatars are always available */
    if (this.avatar === '/assets/empty.png') {
      return this.avatar;
    }
    return this.avatar + '?size=' + res;
  }
}

/* other */
export type subType = 0 | 1 | 2 | 3;
export type dID = string | bigint;
