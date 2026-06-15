import { defineComponent, PropType } from 'vue'
import { RouterLink } from 'vue-router'
import Tag from '../../atoms/Tag/Tag'
import MetricChip from '../MetricChip/MetricChip'
import './CaseCard.scss'

export interface CaseCardItem {
  slug: string
  title: string
  company: string
  year: string
  tags: string[]
  thumbnail: string
  metrics: string[]
}

export default defineComponent({
  name: 'CaseCard',
  props: {
    item: { type: Object as PropType<CaseCardItem>, required: true },
  },
  setup(props) {
    return () => (
      <RouterLink class="case-card" to={`/work/${props.item.slug}`}>
        <div class="case-card__media">
          {props.item.thumbnail
            ? <img
              alt={`${props.item.title} thumbnail`}
              class="case-card__image"
              src={props.item.thumbnail}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            : null
          }
        </div>
        <div class="case-card__body">
          <div class="case-card__meta">
            <span class="case-card__company">{props.item.company}</span>
            <span class="case-card__year">{props.item.year}</span>
          </div>
          <h3 class="case-card__title">{props.item.title}</h3>
          <div class="case-card__tags">
            {props.item.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <div class="case-card__metrics">
            {props.item.metrics.map((metric) => (
              <MetricChip key={metric} label={metric} />
            ))}
          </div>
        </div>
      </RouterLink>
    )
  },
})
