import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({ menu }) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>HKEKs boilerplate</h1>
          <nav>
            <ul className={styles.list}>
              {!!menu?.length &&
                menu.map(({ label, slug, openInANewTab, id }) => {
                  return (
                    <li key={id} className={styles.listItem}>
                      <Link href={slug} passHref>
                        <a
                          className={styles.listItemLink}
                          target={openInANewTab ? '_blank' : '_self'}
                        >
                          {label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

export const MenuType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    openInANewTab: PropTypes.bool,
    url: PropTypes.string,
  }),
);

Header.propTypes = {
  menu: MenuType.isRequired,
};
