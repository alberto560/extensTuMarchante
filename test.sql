select tbUsers.display_name,tbUsers.user_email,tbMetaUsers.meta_value from tm_users tbUsers,tm_usermeta tbMetaUsers where tbMetaUsers.user_id=tbUsers.id and tbMetaUsers.meta_key = 'billing_phone';

select tbUsers.id,tbUsers.display_name,tbUsers.user_email,tbMetaUsers.meta_value from tm_users tbUsers,tm_usermeta tbMetaUsers where tbMetaUsers.user_id=tbUsers.id and tbMetaUsers.meta_key = 'billing_phone';

select tbUsers.id,tbUsers.display_name,tbUsers.user_email from tm_users tbUsers;



select
tbMetaUsers.user_id,
max( CASE WHEN tbMetaUsers.meta_key = 'first_name' and tbMetaUsers.user_id=tbUsers.id THEN tbMetaUsers.meta_value END ) as nombre,
max( CASE WHEN tbMetaUsers.meta_key = 'last_name' and tbMetaUsers.user_id=tbUsers.id THEN tbMetaUsers.meta_value END ) as apellido,
tbUsers.user_email as 'Email',
max( CASE WHEN tbMetaUsers.meta_key = 'billing_phone' and tbMetaUsers.user_id=tbUsers.id THEN tbMetaUsers.meta_value END ) as telefono
 from tm_users tbUsers LEFT JOIN tm_usermeta tbMetaUsers on tbMetaUsers.user_id=tbUsers.id;


 select
 CASE WHEN tbMetaUsers.meta_key = 'first_name' and tbUsers.id=tbMetaUsers.user_id THEN tbMetaUsers.meta_value END as 'nombre',
 CASE WHEN tbMetaUsers.meta_key = 'last_name' and tbUsers.id=tbMetaUsers.user_id THEN tbMetaUsers.meta_value END as 'apellido'
  from tm_users tbUsers LEFT JOIN tm_usermeta tbMetaUsers on tbUsers.id=tbMetaUsers.user_id;







select tbUsers.display_name,tbUsers.user_email,tbMetaUsers.meta_value as 'Telefono' from tm_users tbUsers LEFT JOIN tm_usermeta tbMetaUsers on tbMetaUsers.user_id=tbUsers.id where tbMetaUsers.meta_key = 'billing_phone';

select tbUsers.display_name,tbUsers.user_email,tbMetaUsers.meta_value as 'Telefono' from tm_usermeta tbMetaUsers LEFT JOIN tm_users tbUsers on tbMetaUsers.user_id=tbUsers.id where tbMetaUsers.meta_key = 'billing_phone';
