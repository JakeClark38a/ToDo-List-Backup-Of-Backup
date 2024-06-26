"""empty message

Revision ID: a537d3c9c3fe
Revises: 
Create Date: 2024-05-08 21:19:06.442009

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a537d3c9c3fe'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('groupss', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('group_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('color',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               type_=sa.NVARCHAR(length=10),
               existing_nullable=True)
        batch_op.alter_column('def_tag',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=True)

    with op.batch_alter_table('tags', schema=None) as batch_op:
        batch_op.alter_column('tag_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('tag_color',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               type_=sa.NVARCHAR(length=10),
               existing_nullable=True)
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('group_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('task_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('task_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('task_description',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               type_=sa.NVARCHAR(length=500),
               existing_nullable=True)
        batch_op.alter_column('tag_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('teamgroupss', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('group_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('author_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('color',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               type_=sa.NVARCHAR(length=10),
               existing_nullable=True)
        batch_op.alter_column('def_tag',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=True)
        batch_op.alter_column('team_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('teams', schema=None) as batch_op:
        batch_op.alter_column('team_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('team_name',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('team_description',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               type_=sa.NVARCHAR(length=500),
               existing_nullable=True)
        batch_op.alter_column('team_code',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('admin_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('teamtags', schema=None) as batch_op:
        batch_op.alter_column('tag_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('tag_color',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               type_=sa.NVARCHAR(length=10),
               existing_nullable=True)
        batch_op.alter_column('author_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('group_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('team_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('teamtasks', schema=None) as batch_op:
        batch_op.alter_column('task_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('task_title',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('task_description',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               type_=sa.NVARCHAR(length=500),
               existing_nullable=True)
        batch_op.alter_column('tag_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('author_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('team_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('completed_user',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=True)

    with op.batch_alter_table('trees', schema=None) as batch_op:
        batch_op.add_column(sa.Column('numberOfWaterUsed', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('numberOfFertilizerUsed', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('numberOfBirdHaveEliminated', sa.Integer(), nullable=True))
        batch_op.alter_column('tree_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('user_team', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('team_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               type_=sa.NVARCHAR(length=100),
               existing_nullable=True)
        batch_op.alter_column('name',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=256),
               type_=sa.NVARCHAR(length=256),
               existing_nullable=True,
               existing_server_default=sa.text("''"))
        batch_op.alter_column('bio',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=2000),
               type_=sa.NVARCHAR(length=2000),
               existing_nullable=True,
               existing_server_default=sa.text("''"))
        batch_op.alter_column('country',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=200),
               type_=sa.NVARCHAR(length=200),
               existing_nullable=True)
        batch_op.alter_column('image',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=200),
               type_=sa.NVARCHAR(length=200),
               existing_nullable=True)
        batch_op.alter_column('type_account',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               type_=sa.NVARCHAR(length=10),
               existing_nullable=True)
        batch_op.alter_column('external_id',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=True)
        batch_op.alter_column('last_join_team',
               existing_type=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               type_=sa.NVARCHAR(length=40),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('last_join_team',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=True)
        batch_op.alter_column('external_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=True)
        batch_op.alter_column('type_account',
               existing_type=sa.NVARCHAR(length=10),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               existing_nullable=True)
        batch_op.alter_column('image',
               existing_type=sa.NVARCHAR(length=200),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=200),
               existing_nullable=True)
        batch_op.alter_column('country',
               existing_type=sa.NVARCHAR(length=200),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=200),
               existing_nullable=True)
        batch_op.alter_column('bio',
               existing_type=sa.NVARCHAR(length=2000),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=2000),
               existing_nullable=True,
               existing_server_default=sa.text("''"))
        batch_op.alter_column('name',
               existing_type=sa.NVARCHAR(length=256),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=256),
               existing_nullable=True,
               existing_server_default=sa.text("''"))
        batch_op.alter_column('password',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('email',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('user_team', schema=None) as batch_op:
        batch_op.alter_column('team_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('trees', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('tree_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.drop_column('numberOfBirdHaveEliminated')
        batch_op.drop_column('numberOfFertilizerUsed')
        batch_op.drop_column('numberOfWaterUsed')

    with op.batch_alter_table('teamtasks', schema=None) as batch_op:
        batch_op.alter_column('completed_user',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=True)
        batch_op.alter_column('team_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('author_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('task_description',
               existing_type=sa.NVARCHAR(length=500),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               existing_nullable=True)
        batch_op.alter_column('task_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('task_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('teamtags', schema=None) as batch_op:
        batch_op.alter_column('team_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('group_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('author_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_color',
               existing_type=sa.NVARCHAR(length=10),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               existing_nullable=True)
        batch_op.alter_column('tag_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('tag_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('teams', schema=None) as batch_op:
        batch_op.alter_column('admin_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('team_code',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('team_description',
               existing_type=sa.NVARCHAR(length=500),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               existing_nullable=True)
        batch_op.alter_column('team_name',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('team_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('teamgroupss', schema=None) as batch_op:
        batch_op.alter_column('team_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('def_tag',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=True)
        batch_op.alter_column('color',
               existing_type=sa.NVARCHAR(length=10),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               existing_nullable=True)
        batch_op.alter_column('author_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('group_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('group_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('task_description',
               existing_type=sa.NVARCHAR(length=500),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=500),
               existing_nullable=True)
        batch_op.alter_column('task_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('task_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('tags', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('tag_color',
               existing_type=sa.NVARCHAR(length=10),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               existing_nullable=True)
        batch_op.alter_column('tag_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('tag_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    with op.batch_alter_table('groupss', schema=None) as batch_op:
        batch_op.alter_column('def_tag',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=True)
        batch_op.alter_column('color',
               existing_type=sa.NVARCHAR(length=10),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=10),
               existing_nullable=True)
        batch_op.alter_column('user_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)
        batch_op.alter_column('group_title',
               existing_type=sa.NVARCHAR(length=100),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=100),
               existing_nullable=True)
        batch_op.alter_column('group_id',
               existing_type=sa.NVARCHAR(length=40),
               type_=mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=40),
               existing_nullable=False)

    # ### end Alembic commands ###
