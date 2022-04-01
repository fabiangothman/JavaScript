import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './MobileMenu.module.scss';
import SubscribeForm from '~baseComponents/SubscribeForm';
import { RichTextTypes } from '~baseComponents/RichText';

export default function MobileMenu({
  pathname,
  header,
  subscribeMessage,
  isOpen,
}) {
  return (
    <div className={cx(styles.component, { [styles.componentIsOpen]: isOpen })}>
      {!!header?.length && (
        <nav>
          <ul className={styles.list}>
            {header.map(({ label, slug, sysId }) => {
              const [slugPrefix] = slug.split('/').filter(Boolean);
              const [pathPrefix] = pathname.split('/').filter(Boolean);
              return (
                <li
                  key={sysId}
                  className={cx(styles.listItem, {
                    [styles.listItemActived]: slugPrefix === pathPrefix,
                  })}
                >
                  <Link href={slug}>
                    <a className={styles.listItemLink}>{label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <SubscribeForm message={subscribeMessage} />
    </div>
  );
}

const MenuType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string,
    sysId: PropTypes.string,
    openInANewTab: PropTypes.bool,
    slug: PropTypes.string,
  }),
);

MobileMenu.propTypes = {
  subscribeMessage: RichTextTypes.isRequired,
  header: MenuType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
};
