import { Component, Prop } from '@stencil/core';
import { Config, Mode } from '../../interface';
import { createThemedClasses } from '../../utils/theme';

@Component({
  tag: 'ion-infinite-scroll-content',
  styleUrls: {
    ios: 'infinite-scroll-content.ios.scss',
    md: 'infinite-scroll-content.md.scss'
  }
})
export class InfiniteScrollContent {

  mode!: Mode;

  @Prop({ context: 'config' }) config!: Config;

  /**
   * An animated SVG spinner that shows while loading.
   */
  @Prop({ mutable: true }) loadingSpinner?: string;

  /**
   * Optional text to display while loading.
   */
  @Prop() loadingText?: string;

  componentDidLoad() {
    if (!this.loadingSpinner) {
      this.loadingSpinner = this.config.get(
        'infiniteLoadingSpinner',
        this.config.get('spinner', 'lines')
      );
    }
  }

  hostData() {
    return {
      class: createThemedClasses(this.mode, 'infinite-scroll-content')
    };
  }

  render() {
    return (
      <div class="infinite-loading">
        {this.loadingSpinner && (
          <div class="infinite-loading-spinner">
            <ion-spinner name={this.loadingSpinner} />
          </div>
        )}
        {this.loadingText && (
          <div class="infinite-loading-text" innerHTML={this.loadingText} />
        )}
      </div>
    );
  }
}
