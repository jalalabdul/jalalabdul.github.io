<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
 //Added by WP-Cache Manager
define( 'WPCACHEHOME', '' ); //Added by WP-Cache Manager
define( 'DB_NAME', 'sonofbea_6a3' );

/** MySQL database username */
define( 'DB_USER', 'sonofbea_6a3' );

/** MySQL database password */
define( 'DB_PASSWORD', '4AE7FD6ht3z2mr0gy8f5e1l9' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'e!A|m98M!%</6r~FzNfjK[zPIWZ=!Jq:lxj[gv+_O+@?+`:LA3wj-MF_h{T#.Fhy');
define('SECURE_AUTH_KEY',  'Z!b&)y4c^q8kod/&(Ye3e2hj0V?7tY/wh%L%}=HbJr|s>)w{*!RX1ha*0Tsv0c9v');
define('LOGGED_IN_KEY',    'BiJriYDVERI%idu$JY,%Iz2tJ>n4%e4+-]VrI| I?=!$u)mfi4Y7BD4z%i dI/v3');
define('NONCE_KEY',        'b)*CPhl%-r-TqY63FS0VY/v W[:j/2<4Z$NViS`^64o~YWD+p|sLGDpjdjmrN)Ky');
define('AUTH_SALT',        '.8<,Bj%37{hK/r.4.GQ-c7yKCw:MLq6-h+z$R;pb[TL}{Kg|~jw]H]w+%._R<|+&');
define('SECURE_AUTH_SALT', '^=.t+ ZmA*o)34:yGnvOxGsAaK 92!d*i;8SG`zQ@Zr!,V#p5(5JaebJ759_skfs');
define('LOGGED_IN_SALT',   '?>P@zc%CxVzVA1m}FL3Z)s]#Aw qHo^H.U<ej^@H&7k?XTE2B@sCG~G8?xoO$q[^');
define('NONCE_SALT',       '4yZUhfg>]3wL<*8xLgb#>bU*6exvzyWWim5)P$U&w14$`b}3|]`~xfY0|jJ7eL&p');


/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = '6a3_';



define( 'AUTOSAVE_INTERVAL',    300  );
define( 'WP_POST_REVISIONS',    5    );
define( 'EMPTY_TRASH_DAYS',     7    );
define( 'WP_AUTO_UPDATE_CORE',  true );
define( 'WP_CRON_LOCK_TIMEOUT', 120  );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
